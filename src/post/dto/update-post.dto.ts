import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePostDto extends PartialType(
  PickType(CreatePostDto, ['title', 'excerpt', 'content', 'coverImageUrl']),
) {
  @IsOptional() // Vai depender da lógica que criarmos no service ou no Next.js
  @IsBoolean({ message: 'Campo de publicar post precisa ser boolean' })
  published?: boolean;
}
