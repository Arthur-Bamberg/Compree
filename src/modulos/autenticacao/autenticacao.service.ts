import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface UsuarioPayload {
  sub: string;
  nomeUsuario: string;
}

@Injectable()
export class AutenticacaoService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, senha: string) {
    const usuario = await this.usuarioService.buscaPorEmail(email);

    const usuarioFoiAutenticado = await bcrypt.compare(senha, usuario.senha);

    if (!usuarioFoiAutenticado) {
      throw new UnauthorizedException(
        'O e-mail ou a senha informados está incorreto.',
      );
    }

    const payload: UsuarioPayload = {
      sub: usuario.id,
      nomeUsuario: usuario.nome,
    };

    return {
      token_acesso: await this.jwtService.signAsync(payload),
    };
  }
}
