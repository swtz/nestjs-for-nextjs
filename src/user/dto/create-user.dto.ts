import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Formato inválido' })
  @IsNotEmpty({ message: 'O nome não pode estar vazia' })
  name: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsString({ message: 'Formato inválido' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  password: string;
}
