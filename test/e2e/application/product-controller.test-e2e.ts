import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductApplicationModule } from '@@app/product/product.application.module';
import { TypeORMTestModule } from '../utils/typeorm-test.module';
import { AppDataSource } from '../utils/data-source';
import { ProductEntity } from '@@infra/db/product/product.entity';
import { CategoryEntity } from '@@infra/db/category/category.entity';
import { ProductDto } from '@@app/product/controllers/dto/product.dto';

describe('Product controller (e2e)', () => {
  let app: INestApplication;
  const dataSource = AppDataSource;

  beforeEach(async () => {
    await dataSource.initialize();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeORMTestModule, ProductApplicationModule]
    }).compile();

    await dataSource.runMigrations();
    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterEach(async () => {
    await dataSource.dropDatabase();
    await dataSource.destroy();
    await app.close();
  });

  describe('(GET) /product', () => {
    it('should return product', async () => {
      const product = { productId: '1', productName: 'pName', categoryId: 'cat1' };
      const category = { categoryId: 'cat1', categoryName: 'cat_name' };

      await dataSource.getRepository(CategoryEntity).save(category);
      await dataSource.getRepository(ProductEntity).save(product);
      const response = await request(app.getHttpServer()).get('/product/1').expect(200);

      expect(response.body.productId).toStrictEqual('1');
      expect(response.body.productName).toStrictEqual('pName');
      expect(response.body.categoryId).toStrictEqual('cat1');
    });

    it('should return 404', async () => {
      return request(app.getHttpServer()).get('/product/nonExistingProd').expect(404);
    });
  });

  describe('(POST) /product', () => {
    it('should create product with existing category', async () => {
      // create a category
      const category = { categoryId: 'cat1', categoryName: 'cat_name' };
      await dataSource.getRepository(CategoryEntity).save(category);

      const payload: ProductDto = { productId: '1', productName: 'pName', categoryId: 'cat1' };

      await request(app.getHttpServer()).post('/product').send(payload).expect(201);

      const product = await dataSource.getRepository(ProductEntity).findOne({ where: { productId: payload.productId } });
      expect(product.productId).toStrictEqual('1');
    });

    it('should return 400 if category does not exist', async () => {
      const payload: ProductDto = { productId: '2', productName: 'pName', categoryId: 'cat2' };

      return request(app.getHttpServer()).post('/product').send(payload).expect(400);
    });

    it('should return 400 if product name is invalid', async () => {
      const payload: Partial<ProductDto> = { productId: '3', categoryId: 'cat2' };

      return request(app.getHttpServer()).post('/product').send(payload).expect(400);
    });
  });
});
