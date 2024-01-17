import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';

@Injectable()
export class ProdutoRepository {
  private produtos: ProdutoEntity[] = [];

  async salvar(produto: ProdutoEntity) {
    this.produtos.push(produto);
  }

  async listaProdutos() {
    return this.produtos;
  }

  async atualiza(id: string, novosDados: Partial<ProdutoEntity>) {
    const produto = await this.buscaPorId(id);

    Object.entries(novosDados).forEach(([chave, valor]) => {
      if (chave === 'id' || chave === 'usuarioId') {
        return;
      }

      produto[chave] = valor;
    });

    return produto;
  }

  async remove(id: string) {
    const produto = await this.buscaPorId(id);

    this.produtos = this.produtos.filter((produto) => produto.id !== id);

    return produto;
  }

  async buscaPorId(id: string) {
    const possivelProduto = this.produtos.find((produto) => produto.id === id);

    if (!possivelProduto) {
      throw new Error('Produto não encontrado');
    }

    return possivelProduto;
  }
}
