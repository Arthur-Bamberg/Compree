import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criaUsuario(usuarioEntity: UsuarioEntity) {
    this.usuarioRepository.save(usuarioEntity);
  }

  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuarioLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );
    return usuarioLista;
  }

  async atualizaUsuario(id: string, usuarioEntity: AtualizaUsuarioDTO) {
    this.usuarioRepository.update(id, usuarioEntity);
  }

  async deletaUsuario(id: string) {
    this.usuarioRepository.delete(id);
  }
}
