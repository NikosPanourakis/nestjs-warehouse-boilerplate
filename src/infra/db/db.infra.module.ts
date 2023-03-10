import { CategoryEntity } from '@@infra/db/category/category.entity';
import { CategoryRepository } from '@@infra/db/category/category.repository';
import { ProductEntity } from '@@infra/db/product/product.entity';
import { ProductRepository } from '@@infra/db/product/product.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const repos = [
  {
    useClass: ProductRepository,
    provide: 'ProductRepository'
  },
  {
    useClass: CategoryRepository,
    provide: 'CategoryRepository'
  }
];

const clients = [TypeOrmModule.forFeature([ProductEntity]), TypeOrmModule.forFeature([CategoryEntity])];

@Module({
  imports: [...clients],
  controllers: [],
  providers: [...repos],
  exports: [...repos]
})
export class DBModule {}
