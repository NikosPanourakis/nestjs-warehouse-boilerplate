import { Product } from '@@domain/product/models/product.model';
import { IProductRepository } from '@@domain/product/repositories/product-repository.interface';
import { ProductEntity } from '@@infra/db/product/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(@InjectRepository(ProductEntity) private product: Repository<ProductEntity>) {}

  async getById(productId: string): Promise<Product> {
    const foundProduct = await this.product.findOne({ where: { productId } });

    return plainToInstance(Product, foundProduct);
  }

  async save(product: Product): Promise<Product> {
    const savedProduct = await this.product.save(plainToInstance(ProductEntity, product));

    return plainToInstance(Product, savedProduct);
  }
}
