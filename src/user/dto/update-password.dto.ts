import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString({ message: 'Formato inválido' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  currentPassword: string;

  @IsString({ message: 'Formato inválido' })
  @IsNotEmpty({ message: 'A nova senha não pode estar vazia' })
  @MinLength(6, { message: 'A nova senha precisa ter pelo menos 6 caracteres' })
  newPassword: string;
}
