import { Module } from '@nestjs/common'
import { PrismaService } from 'src/pisma.service'
import { PostController } from './post.controller'
import { PostService } from './post.service'

@Module({
	controllers: [PostController],
	providers: [PostService, PrismaService],
	exports: [PostService]
})
export class PostModule {}
