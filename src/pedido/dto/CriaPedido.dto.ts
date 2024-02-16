import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ItemPedidoDto {
  @IsUUID()
  produtoId: string;
  @IsInt()
  quantidade: number;
}

export class CriaPedidoDto {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemPedidoDto)
  itensPedido: ItemPedidoDto[];
}
