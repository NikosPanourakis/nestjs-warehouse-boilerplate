import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ChangeProductDetailsDto {
  @ApiProperty()
  @IsString()
  productName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  productDescription?: string;
}
