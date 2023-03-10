import { ProductDto } from '@@app/product/controllers/dto/product.dto';
import { Type } from 'class-transformer';

export class CategoryDto {
  categoryId: string;

  categoryName: string;

  categoryDescription?: string;

  parentId: string;

  @Type(() => ProductDto)
  products?: ProductDto[];
}
