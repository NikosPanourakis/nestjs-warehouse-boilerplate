import { ChangeProductDetailsDto } from '@@app/product/controllers/dto/change-product.dto';
import { CreateProductDto } from '@@app/product/controllers/dto/create-product.dto';
import { ProductDto } from '@@app/product/controllers/dto/product.dto';
import { ICategoryRepository } from '@@domain/category/repositories/category-repository.interface';
import { Product } from '@@domain/product/models/product.model';
import { IProductRepository } from '@@domain/product/repositories/product-repository.interface';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@Controller('product')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class ProductController {
  constructor(
    @Inject('ProductRepository') private prodRepo: IProductRepository,
    @Inject('CategoryRepository') private catRepo: ICategoryRepository
  ) {}

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<ProductDto> {
    const product = await this.prodRepo.getById(id);
    if (!product) {
      throw new NotFoundException();
    }

    return plainToInstance(ProductDto, product);
  }

  @Post()
  @ApiBody({
    description: 'Add a new product',
    type: CreateProductDto
  })
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<ProductDto> {
    const category = await this.catRepo.getById(createProductDto.categoryId);
    if (!category) {
      throw new BadRequestException(`Category ${createProductDto.categoryId} does not exist.`);
    }

    const product = await this.prodRepo.getById(createProductDto.productId);
    if (product) {
      throw new BadRequestException(`Product ${createProductDto.productId} already exists.`);
    }

    const savedProduct = await this.prodRepo.save(plainToInstance(Product, createProductDto));

    return plainToInstance(ProductDto, savedProduct);
  }

  @Put(':id')
  @ApiBody({
    description: 'Change product name and description',
    type: ChangeProductDetailsDto
  })
  async changeProductDetails(@Body() changeProductDto: ChangeProductDetailsDto, @Param('id') id: string): Promise<ProductDto> {
    const product = await this.prodRepo.getById(id);
    if (!product) {
      throw new BadRequestException(`Product ${id} does not exist.`);
    }

    const savedProduct = await this.prodRepo.save(plainToInstance(Product, { ...changeProductDto, productId: id }));

    return plainToInstance(ProductDto, savedProduct);
  }
}
