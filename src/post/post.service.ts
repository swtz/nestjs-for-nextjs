import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/user/entities/user.entity';
import { Post } from './entities/post.entity';
import { createSlugFromText } from 'src/common/utils/create-slug-from-text';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(postDto: CreatePostDto, author: User) {
    const post = this.postRepository.create({
      // slug: 'caiu-na-pegadinha-' + Math.random().toString(36).substring(2, 8), // slug temporário
      slug: createSlugFromText(postDto.title),
      title: postDto.title,
      excerpt: postDto.excerpt,
      content: postDto.content,
      author,
    });

    const created = await this.postRepository
      .save(post)
      .catch((err: unknown) => {
        throw new BadRequestException('Erro ao criar o post');
      });

    return created;
  }
}
