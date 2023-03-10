import { Product } from '@@domain/product/models/product.model';
import { Type } from 'class-transformer';

export class Category {
  categoryId: string;

  parentId?: string;

  categoryName: string;

  categoryDescription?: string;

  @Type(() => Product)
  products: Product[];
}
