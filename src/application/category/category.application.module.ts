import { CategoryController } from '@@app/category/controllers/category.controller';
import { DBModule } from '@@infra/db/db.infra.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DBModule],
  controllers: [CategoryController],
  providers: []
})
export class CategoryApplicationModule {}
