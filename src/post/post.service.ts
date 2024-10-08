import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/pisma.service'
import { PostDto } from './post.dto'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.post.findMany()
  }

  async getPostBySlug(slug: string) {
    return this.prisma.post.findUnique({ where: { slug: slug } })
  }

  async create(dto: PostDto, userId: string, categoryId: string) {
    return this.prisma.post.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId
          }
        },
        category: {
          connect: {
            id: categoryId
          }
        }
      }
    })
  }

  async update(dto: Partial<PostDto>, slug: string, userId: string) {
    return this.prisma.post.update({
      where: {
        userId,
        id: slug
      },
      data: dto
    })
  }

  async delete(slug: string) {
    return this.prisma.post.delete({
      where: {
        id: slug
      }
    })
  }

  async updateCountOpened(slug: string) {
    return this.prisma.post.update({
      where: {
        slug
      },
      data: {
        countOpened: {
          increment: 1
        }
      }
    })
  }
}
