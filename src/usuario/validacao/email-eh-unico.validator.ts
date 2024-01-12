import { ValidatorConstraintInterface } from 'class-validator';
import { UsuarioRepository } from '../usuario.repository';

export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
  validate(email: string) {
    return UsuarioRepository.buscaPorEmail(email) === undefined;
  }
}
