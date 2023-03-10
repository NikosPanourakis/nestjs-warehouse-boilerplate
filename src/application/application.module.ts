import { CategoryApplicationModule } from '@@app/category/category.application.module';
import { ProductApplicationModule } from '@@app/product/product.application.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ProductApplicationModule, CategoryApplicationModule],
  controllers: [],
  providers: []
})
export class ApplicationModule {}
