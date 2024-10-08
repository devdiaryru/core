import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { PostDto } from './post.dto'
import { PostService } from './post.service'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAll() {
    return this.postService.getAll()
  }

  @Get(':slug')
  async getPostBySlug(@Param('slug') slug: string) {
    return this.postService.getPostBySlug(slug)
  }

  @Post('count/:slug')
  @HttpCode(200)
  async updateCountOpened(@Param('slug') slug: string) {
    return this.postService.updateCountOpened(slug)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth('admin')
  async create(
    @Body() dto: PostDto,
    @CurrentUser('id') userId: string,
    @Body('category') categoryId: string
  ) {
    return this.postService.create(dto, userId, categoryId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':slug')
  @Auth('admin')
  async update(
    @Body() dto: PostDto,
    @CurrentUser('id') userId: string,
    @Param('slug') slug: string
  ) {
    return this.postService.update(dto, slug, userId)
  }

  @HttpCode(200)
  @Delete(':slug')
  @Auth('admin')
  async delete(@Param('slug') slug: string) {
    return this.postService.delete(slug)
  }
}
