import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDto } from './dto/CriaPedido.dto';
import { AtualizaPedidoDto } from './dto/AtualizaPedido.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  AutenticacaoGuard,
  RequisicaoComUsuario,
} from '../autenticacao/autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(
    @Req() req: RequisicaoComUsuario,
    @Body() dadosDoPedido: CriaPedidoDto,
  ) {
    const usuarioId = req.usuario.sub;
    return this.pedidoService.cadastraPedido(usuarioId, dadosDoPedido);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async buscaPedidos(@Req() req: RequisicaoComUsuario) {
    const usuarioId = req.usuario.sub;
    return this.pedidoService.buscaPedidos(usuarioId);
  }

  @Patch(':id')
  async atualizaPedido(
    @Param('id') pedidoId: string,
    @Body() dadosDoPedido: AtualizaPedidoDto,
    @Req() req: RequisicaoComUsuario,
  ) {
    const usuarioId = req.usuario.sub;
    return this.pedidoService.atualizaPedido(
      pedidoId,
      dadosDoPedido,
      usuarioId,
    );
  }
}
