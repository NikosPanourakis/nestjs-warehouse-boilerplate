import { ProductDto } from '@@app/product/controllers/dto/product.dto';
import { Product } from '@@domain/product/models/product.model';

export interface IProductRepository {
  getById(productId: string): Promise<Product>;
  save(product: ProductDto): Promise<Product>;
}
