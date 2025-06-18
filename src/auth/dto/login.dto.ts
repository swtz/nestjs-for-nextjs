import { Type } from 'class-transformer';
import { Allow, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsString({ message: 'Formato inválido' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  password: string;

  @Allow()
  @Type(() => Number)
  foo: number;
}
