import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdutoRepository {
  private produtos = [];

  async salvar(produto) {
    this.produtos.push(produto);
  }

  async listaProdutos() {
    return this.produtos;
  }
}
