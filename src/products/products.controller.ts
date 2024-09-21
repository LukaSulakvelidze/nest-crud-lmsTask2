import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { productsDTO } from './dto/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Get('/')
  getProducts(
    @Headers() header,
    @Query('lang', new DefaultValuePipe('en')) query,
  ) {
    return this.ProductsService.getAllProducts(header, query);
  }

  @Post('/')
  createProduct(@Body() product): productsDTO {
    return this.ProductsService.createProduct(product);
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) id: number): productsDTO {
    return this.ProductsService.getProductById(id);
  }

  @Delete('/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.ProductsService.deleteProduct(id);
  }

  @Put('/:id')
  updateProduct(@Param('id') id: string, @Body() newFields): productsDTO {
    return this.ProductsService.updateProduct(id, newFields);
  }
}
