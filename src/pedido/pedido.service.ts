import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { In, Repository } from 'typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { StatusPedido } from './enum/status-pedido.enum';
import { CriaPedidoDto } from './dto/CriaPedido.dto';
import { ItemPedidoEntity } from './item-pedido.entity';
import { ProdutoEntity } from 'src/produto/produto.entity';
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

  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDto) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    const pedido = new PedidoEntity();

    pedido.status = StatusPedido.EM_PROCESSAMENTO;
    pedido.usuario = usuario;
    const produtosIds = dadosDoPedido.itensPedido.map(
      (itemPedido) => itemPedido.produtoId,
    );

    const produtosRelacionados = await this.produtoRepository.findBy({
      id: In(produtosIds),
    });

    pedido.itensPedido = dadosDoPedido.itensPedido.map((itemPedido) => {
      const itemPedidoEntity = new ItemPedidoEntity();

      itemPedidoEntity.produto = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );
      itemPedidoEntity.precoVenda = itemPedidoEntity.produto.valor;

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

    Object.assign(pedido, dadosDoPedido);

    return this.pedidoRepository.save(pedido);
  }
}
