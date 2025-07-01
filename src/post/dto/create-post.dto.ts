import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Título precisa ser um texto' })
  @Length(10, 150, { message: 'Título precisa ter entre 10 e 150 caracteres.' })
  title: string;

  @IsString({ message: 'Excerto precisa ser um texto' })
  @Length(10, 200, { message: 'Título precisa ter entre 10 e 200 caracteres.' })
  excerpt: string;

  @IsString({ message: 'Conteúdo precisa ser um texto' })
  @IsNotEmpty({ message: 'Conteúdo não pode estar vazio' })
  content: string;

  @IsOptional() // Vai ser requerido pelo Next.js
  @IsUrl({ require_tld: false }) // Top level domain proíbe localhost e IP
  coverImageUrl?: string;
}
