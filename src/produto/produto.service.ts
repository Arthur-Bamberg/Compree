import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(produtoEntity: ProdutoEntity) {
    await this.produtoRepository.save(produtoEntity);
  }

  async listaProdutos() {
    const produtosSalvos = await this.produtoRepository.find();
    return produtosSalvos;
  }

  async atualizaProduto(id: string, produtoEntity: AtualizaProdutoDTO) {
    await this.produtoRepository.update(id, produtoEntity);
  }

  async deletaProduto(id: string) {
    await this.produtoRepository.delete(id);
  }
}
