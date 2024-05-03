import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDto } from './dto/CriaPedido.dto';
import { AtualizaPedidoDto } from './dto/AtualizaPedido.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AutenticacaoGuard } from '../autenticacao/autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(
    @Query('usuarioId') usuarioId: string,
    @Body() dadosDoPedido: CriaPedidoDto,
  ) {
    return this.pedidoService.cadastraPedido(usuarioId, dadosDoPedido);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async buscaPedidos(@Query('usuarioId') usuarioId: string) {
    return this.pedidoService.buscaPedidos(usuarioId);
  }

  @Patch(':id')
  async atualizaPedido(
    @Param('id') pedidoId: string,
    @Body() dadosDoPedido: AtualizaPedidoDto,
  ) {
    return this.pedidoService.atualizaPedido(pedidoId, dadosDoPedido);
  }
}
