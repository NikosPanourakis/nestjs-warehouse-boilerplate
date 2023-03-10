import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class initial1678118835902 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // category entity
    await queryRunner.createTable(
      new Table({
        name: 'category',
        columns: [
          {
            name: 'category_id',
            isPrimary: true,
            type: 'varchar',
            length: '255'
          },
          {
            name: 'parent_id',
            type: 'varchar',
            length: '255',
            default: null,
            isNullable: true
          },
          {
            name: 'category_name',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'category_description',
            type: 'varchar',
            length: '255',
            isNullable: true
          }
        ]
      })
    );

    // product entity
    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'product_id',
            isPrimary: true,
            type: 'varchar',
            length: '255'
          },
          {
            name: 'product_name',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'category_id',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'product_description',
            type: 'varchar',
            length: '255',
            isNullable: true
          }
        ]
      })
    );

    const categoryProductFK = new TableForeignKey({
      name: 'categoryProductFK',
      columnNames: ['category_id'],
      referencedColumnNames: ['category_id'],
      referencedTableName: 'category',
      onDelete: 'CASCADE'
    });
    await queryRunner.createForeignKey('product', categoryProductFK);

    const categorySubCategoryFK = new TableForeignKey({
      name: 'categorySubCategoryFK',
      columnNames: ['parent_id'],
      referencedColumnNames: ['category_id'],
      referencedTableName: 'category',
      onDelete: 'CASCADE'
    });
    await queryRunner.createForeignKey('category', categorySubCategoryFK);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('category');
    await queryRunner.dropTable('product');
    await queryRunner.dropForeignKey('product', 'categoryProductFK');
    await queryRunner.dropForeignKey('category', 'categorySubCategoryFK');
  }
}
