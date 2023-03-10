import { Category } from '@@domain/category/models/category.model';

export interface ICategoryRepository {
  getById(categoryId: string): Promise<Category>;
  save(category: Category): Promise<Category>;
  remove(categoryId: string): Promise<boolean>;
}
