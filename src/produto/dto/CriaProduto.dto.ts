import {
  IsArray,
  IsNotEmpty,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CaracteristicaProdutoDTO } from './CaracteristicaProduto.dto';
import { ImagemProdutoDTO } from './ImagemProduto.dto';
import { Type } from 'class-transformer';

export class CriaProdutoDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;
  @IsPositive({
    message:
      'O valor do produto precisa ser um número positivo (não pode ser zero) e ter até duas casas decimais',
  })
  valor: number;
  @IsPositive({
    message: 'A quantidade precisa ser um número igual ou maior que zero',
  })
  quantidade: number;
  @IsString({ message: 'A descrição precisa ser uma string' })
  descricao: string;

  @ValidateNested()
  @IsArray()
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];
  @ValidateNested()
  @IsArray()
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];

  @IsNotEmpty({ message: 'A categoria não pode ser vazia' })
  categoria: string;
}
