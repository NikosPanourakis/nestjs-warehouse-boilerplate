import { Product } from '@@domain/product/models/product.model';

export interface IProductRepository {
  getById(productId: string): Promise<Product>;
  save(product: Product): Promise<Product>;
}
