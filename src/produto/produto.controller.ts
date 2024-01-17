import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { v4 as uuid } from 'uuid';
import { ProdutoEntity } from './produto.entity';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}

  @Post()
  async criaProduto(@Body() dadosProduto: CriaProdutoDTO) {
    const produto = new ProdutoEntity();

    produto.id = uuid();
    produto.nome = dadosProduto.nome;
    produto.usuarioId = dadosProduto.usuarioId;
    produto.valor = dadosProduto.valor;
    produto.quantidade = dadosProduto.quantidade;
    produto.descricao = dadosProduto.descricao;
    produto.categoria = dadosProduto.categoria;
    produto.caracteristicas = dadosProduto.caracteristicas;
    produto.imagens = dadosProduto.imagens;

    this.produtoRepository.salvar(produto);
    return produto;
  }

  @Get()
  async listaProdutos() {
    return this.produtoRepository.listaProdutos();
  }

  @Put('/:id')
  async atualizaProduto(
    @Param('id') id: string,
    @Body() novosDados: AtualizaProdutoDTO,
  ) {
    return this.produtoRepository.atualiza(id, novosDados);
  }

  @Delete('/:id')
  async removeProduto(@Param('id') id: string) {
    return {
      produto: await this.produtoRepository.remove(id),
      mensagem: 'Produto removido com sucesso!',
    };
  }
}
