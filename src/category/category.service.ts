import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/pisma.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto
    })
  }

  async findAll() {
    return this.prisma.category.findMany({
      include: {
        posts: true
      }
    })
  }

  async findOne(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
      include: {
        posts: true
      }
    })
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto
    })
  }

  async remove(id: string) {
    return this.prisma.category.delete({
      where: { id }
    })
  }
}
