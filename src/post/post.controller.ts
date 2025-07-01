import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/types/authenticated-request';
import { CreatePostDto } from './dto/create-post.dto';
import { ResponsePostDto } from './dto/response-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('me')
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() postDto: CreatePostDto,
  ) {
    const post = await this.postService.create(postDto, req.user);
    return new ResponsePostDto(post);
  }
}
