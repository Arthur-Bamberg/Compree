/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { In, Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/status-pedido.enum';
import { CriaPedidoDto } from './dto/CriaPedido.dto';
import { ItemPedidoEntity } from './item-pedido.entity';
import { ProdutoEntity } from '../produto/produto.entity';
import { AtualizaPedidoDto } from './dto/AtualizaPedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  private async buscaUsuario(usuarioId: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });

    if (usuario === null) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuario;
  }

  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDto) {
    const usuario = await this.buscaUsuario(usuarioId);

    const pedido = new PedidoEntity();

    pedido.status = StatusPedido.EM_PROCESSAMENTO;
    pedido.usuario = usuario;
    const produtosIds = dadosDoPedido.itensPedido.map(
      (itemPedido) => itemPedido.produtoId,
    );

    const produtosRelacionados = await this.produtoRepository.findBy({
      id: In(produtosIds),
    });

    this.trataDadosDoPedido(dadosDoPedido, produtosRelacionados);

    pedido.itensPedido = dadosDoPedido.itensPedido.map((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );

      const itemPedidoEntity = new ItemPedidoEntity();

      itemPedidoEntity.produto = produtoRelacionado!;
      itemPedidoEntity.precoVenda = itemPedidoEntity!.produto.valor;

      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade;

      itemPedidoEntity.quantidade = itemPedido.quantidade;
      return itemPedidoEntity;
    });

    pedido.valorTotal = pedido.itensPedido.reduce((total, item) => {
      return total + item.quantidade * item.precoVenda;
    }, 0);

    const pedidoCriado = await this.pedidoRepository.save(pedido);
    return pedidoCriado;
  }

  async buscaPedidos(usuarioId: string) {
    const pedidos = await this.pedidoRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: {
        usuario: true,
      },
    });
    return pedidos;
  }

  async atualizaPedido(pedidoId: string, dadosDoPedido: AtualizaPedidoDto) {
    const pedido = await this.pedidoRepository.findOneBy({ id: pedidoId });

    if (pedido === null) {
      throw new NotFoundException('O pedido não foi encontrado');
    }

    Object.assign(pedido, dadosDoPedido as PedidoEntity);

    return this.pedidoRepository.save(pedido);
  }

  private trataDadosDoPedido(
    dadosDoPedido: CriaPedidoDto,
    produtosRelacionados: ProdutoEntity[],
  ) {
    dadosDoPedido.itensPedido.forEach((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );

      if (produtoRelacionado === undefined) {
        throw new NotFoundException(
          `O produto com id ${itemPedido.produtoId} não foi encontrado`,
        );
      }

      if (itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel) {
        throw new BadRequestException(
          `A quantidade solicitada (${itemPedido.quantidade}) é maior que a quantidade disponível (${produtoRelacionado.quantidadeDisponivel}) para o ${produtoRelacionado.nome}.`,
        );
      }
    });
  }

  async obtemPedidosDeUsuario(usuarioId: string) {
    await this.buscaUsuario(usuarioId);

    return this.pedidoRepository.find({
      where: {
        usuario: { id: usuarioId },
      },
      relations: {
        usuario: true,
      },
    });
  }
}
