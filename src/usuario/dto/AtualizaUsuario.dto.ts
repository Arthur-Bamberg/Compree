import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { emailEhUnico } from '../validacao/email-eh-unico.validator';

export class AtualizaUsuarioDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsOptional()
  nome: string;

  @IsEmail(undefined, {
    message: 'O email deve ser um endereço de email válido',
  })
  @emailEhUnico({ message: 'Já existe usuário com esse email' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @IsOptional()
  senha: string;
}
