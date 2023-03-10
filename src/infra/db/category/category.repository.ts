import { Category } from '@@domain/category/models/category.model';
import { ICategoryRepository } from '@@domain/category/repositories/category-repository.interface';
import { CategoryEntity } from '@@infra/db/category/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(@InjectRepository(CategoryEntity) private category: Repository<CategoryEntity>) {}

  async getById(categoryId: string): Promise<Category> {
    const foundCategory = await this.category.findOne({ where: { categoryId } });

    return plainToInstance(Category, foundCategory);
  }

  async save(category: Category): Promise<Category> {
    const savedCategory = await this.category.save(plainToInstance(CategoryEntity, category));

    return plainToInstance(Category, savedCategory);
  }

  async remove(categoryId: string): Promise<boolean> {
    const deleted = await this.category.delete({ categoryId });

    if (deleted?.affected === 1) {
      return true;
    }
    return false;
  }
}
