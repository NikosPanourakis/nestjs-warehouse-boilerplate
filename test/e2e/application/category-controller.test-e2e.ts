import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeORMTestModule } from '../utils/typeorm-test.module';
import { AppDataSource } from '../utils/data-source';
import { CategoryEntity } from '@@infra/db/category/category.entity';
import { CategoryApplicationModule } from '@@app/category/category.application.module';
import { CreateCategoryDto } from '@@app/category/controllers/dto/create-category.dto';

describe('Category controller (e2e)', () => {
  let app: INestApplication;
  const dataSource = AppDataSource;

  beforeEach(async () => {
    await dataSource.initialize();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeORMTestModule, CategoryApplicationModule]
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

  describe('(GET) /category', () => {
    it('should return category', async () => {
      const category = { categoryId: 'cat1', categoryName: 'cat_name' };

      await dataSource.getRepository(CategoryEntity).save(category);
      const response = await request(app.getHttpServer()).get('/category/cat1').expect(200);

      expect(response.body.categoryName).toStrictEqual('cat_name');
      expect(response.body.categoryId).toStrictEqual('cat1');
    });

    it('should return 404', async () => {
      return request(app.getHttpServer()).get('/category/nonExistingCat').expect(404);
    });
  });

  describe('(POST) /category', () => {
    it('should create category', async () => {
      const payload: CreateCategoryDto = { categoryName: 'cName', categoryId: 'cat1' };

      await request(app.getHttpServer()).post('/category').send(payload).expect(201);

      const category = await dataSource.getRepository(CategoryEntity).findOne({ where: { categoryId: payload.categoryId } });
      expect(category.categoryId).toStrictEqual(payload.categoryId);
    });
    it('should return 400 if category name is invalid', async () => {
      const payload: Partial<CreateCategoryDto> = { categoryId: 'cat1' };

      return request(app.getHttpServer()).post('/category').send(payload).expect(400);
    });
  });
  describe('(DELETE) /category', () => {
    it('should delete sub-category when main category gets deleted', async () => {
      // create main category and the sub category
      const mainCategory: CreateCategoryDto = { categoryName: 'cName', categoryId: 'cat1' };
      const subCategory: CreateCategoryDto = { categoryName: 'subName', categoryId: 'sub1', parentId: 'cat1' };

      await request(app.getHttpServer()).post('/category').send(mainCategory).expect(201);
      await request(app.getHttpServer()).post('/category').send(subCategory).expect(201);

      // confirm sub category is created
      const category = await dataSource.getRepository(CategoryEntity).findOne({ where: { categoryId: subCategory.categoryId } });
      expect(category.categoryId).toStrictEqual(subCategory.categoryId);

      // delete main category
      await request(app.getHttpServer()).delete(`/category/${mainCategory.categoryId}`);

      // expect sub category to be deleted
      const deletedSubCat = await dataSource.getRepository(CategoryEntity).findOne({ where: { categoryId: subCategory.categoryId } });
      expect(deletedSubCat).toStrictEqual(null);
    });
  });
});
