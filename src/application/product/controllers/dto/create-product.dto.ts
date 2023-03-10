import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'prod_1' })
  @IsString()
  productId: string;

  @ApiProperty()
  @IsString()
  productName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  productDescription?: string;

  @ApiProperty()
  @IsString()
  categoryId: string;
}
