import { CategoryEntity } from '@@infra/db/category/category.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryColumn({ name: 'product_id' })
  productId: string;

  @Column({ name: 'product_name' })
  productName: string;

  @Column({ name: 'product_description', nullable: true })
  productDescription?: string;

  @Column({ name: 'category_id' })
  categoryId: string;

  @ManyToOne(() => CategoryEntity, (category) => category.products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
}
