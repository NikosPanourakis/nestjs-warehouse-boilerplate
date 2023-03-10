import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'cat_1' })
  @IsString()
  categoryId: string;

  @ApiProperty()
  @IsString()
  categoryName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  categoryDescription?: string;

  @ApiProperty({ description: 'Parent category' })
  @IsOptional()
  @IsString()
  parentId?: string;
}
