import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';
import { RequisicaoComUsuario } from 'src/modulos/autenticacao/autenticacao/autenticacao.guard';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}

  intercept(contexto: ExecutionContext, next: CallHandler): Observable<any> {
    const contextoHttp = contexto.switchToHttp();

    const requisicao = contextoHttp.getRequest<
      Request | RequisicaoComUsuario
    >();
    return next.handle().pipe(
      tap(() => {
        if ('usuario' in requisicao) {
          const requisicaoUsuario = requisicao as { usuario: { sub: string } };
          this.logger.log(
            `Rota acessada pelo usuário ${requisicaoUsuario.usuario.sub}`,
          );
        }
      }),
    );
  }
}
