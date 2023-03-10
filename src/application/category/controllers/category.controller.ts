import { CategoryDto } from '@@app/category/controllers/dto/category.dto';
import { CreateCategoryDto } from '@@app/category/controllers/dto/create-category.dto';
import { Category } from '@@domain/category/models/category.model';
import { CategoryRepository } from '@@infra/db/category/category.repository';
import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@Controller('category')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class CategoryController {
  constructor(@Inject('CategoryRepository') private categoryRepo: CategoryRepository) {}

  @Get(':id')
  async getCategory(@Param('id') id: string): Promise<CategoryDto> {
    const category = await this.categoryRepo.getById(id);
    if (!category) {
      throw new NotFoundException();
    }

    return plainToInstance(CategoryDto, category);
  }

  @Post()
  @ApiBody({
    description: 'Add a new category',
    type: CreateCategoryDto
  })
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const savedCategory = await this.categoryRepo.save(plainToInstance(Category, createCategoryDto));

    return plainToInstance(CategoryDto, savedCategory);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<boolean> {
    const category = await this.categoryRepo.getById(id);
    if (!category) {
      throw new NotFoundException();
    }

    return this.categoryRepo.remove(id);
  }
}
