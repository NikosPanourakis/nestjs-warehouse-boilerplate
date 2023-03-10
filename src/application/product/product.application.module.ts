import { ProductController } from '@@app/product/controllers/product.controller';
import { DBModule } from '@@infra/db/db.infra.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DBModule],
  controllers: [ProductController],
  providers: []
})
export class ProductApplicationModule {}
