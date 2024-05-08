import { ConsoleLogger, Injectable } from '@nestjs/common';
import { bgMagenta, white } from 'colors';
import { appendFileSync, existsSync, writeFileSync } from 'fs';
import { ProdutoEntity } from '../produto/produto.entity';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  formataLog(nome: string, quantidade: number, valor: number) {
    return `LOCAL: ${
      this.context
    } - NOME: ${nome} - QUANTIDADE: ${quantidade} - PREÇO: ${valor} - TIMESTAMP ${this.getTimestamp()}`;
  }

  logColorido(produto: ProdutoEntity) {
    const { nome, quantidadeDisponivel, valor } = produto;
    const logFormatado = this.formataLog(nome, quantidadeDisponivel, valor);

    console.log(bgMagenta(white(logFormatado)));
  }

  logEmArquivo(produto: ProdutoEntity) {
    const { nome, quantidadeDisponivel, valor } = produto;

    const mensagemFormatada =
      this.formataLog(nome, quantidadeDisponivel, valor) + '\n';

    const caminhoDoLog = './src/modulos/customLogger/arquivo.log';

    // if (!existsSync(caminhoDoLog)) writeFileSync(caminhoDoLog, '');
    appendFileSync(caminhoDoLog, mensagemFormatada);
  }
}
