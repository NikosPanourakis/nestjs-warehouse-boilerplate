import { ProductEntity } from '@@infra/db/product/product.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryColumn({ name: 'category_id' })
  categoryId: string;

  @Column({ name: 'category_name' })
  categoryName: string;

  @Column({ name: 'category_description', nullable: true })
  categoryDescription?: string;

  @Column({ name: 'parent_id', nullable: true, default: null })
  parentId?: string;

  @OneToMany(() => ProductEntity, (product) => product.category, { eager: true })
  products: ProductEntity[];
}
