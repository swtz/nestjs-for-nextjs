import { Post } from '../entities/post.entity';

export class ResponsePostDto {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly content: string;
  readonly excerpt: string;
  readonly coverImageUrl: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(post: Post) {
    this.id = post.id;
    this.title = post.title;
    this.slug = post.slug;
    this.content = post.content;
    this.excerpt = post.excerpt;
    this.coverImageUrl = post.coverImageUrl;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updateAt;
  }
}
