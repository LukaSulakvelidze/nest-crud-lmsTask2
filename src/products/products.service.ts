import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { productsDTO } from './dto/products.dto';

@Injectable()
export class ProductsService {
  private products = [
    {
      id: 1,
      name: 'Iphone',
      price: 1000,
      category: 'Tech',
      createdAt: 'Sat Sep 21 2024 / 16:11:0',
    },
    {
      id: 2,
      name: 'Car',
      category: 'Dealership',
      price: 132984,
      createdAt: 'Sat Sep 21 2024 / 16:11:28',
    },
    {
      id: 3,
      name: 'MacBook',
      category: 'Tech',
      price: 100,
      createdAt: 'Sat Sep 21 2024 / 16:11:48',
    },
  ];

  private productsGeo = [
    {
      აიდი: 1,
      სახელი: 'Iphone',
      ფასი: 1000,
      კატეგორია: 'Tech',
      შეიქმნა: 'Sat Sep 21 2024 / 16:11:0',
    },
  ];

  createdAt() {
    const date = new Date();
    const currentDate = date.toDateString();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const currentTime = `${hours}:${minutes}:${seconds}`;
    return `${currentDate} / ${currentTime}`;
  }

  getAllProducts(token: boolean, filterQuery, lang: string) {
    if (!token) throw new BadRequestException();
    if (lang == 'ka') return this.productsGeo;
    if (filterQuery.category && filterQuery.price) {
      return this.products
        .filter((item) => item.category === filterQuery.category)
        .filter((item) => item.price > filterQuery.price);
    } else if (filterQuery.category) {
      return this.products.filter(
        (item) => item.category === filterQuery.category,
      );
    } else if (filterQuery.price) {
      return this.products.filter((item) => item.price > filterQuery.price);
    } else {
      return this.products;
    }
  }

  createProduct(productFields: productsDTO) {
    if (!productFields.name || !productFields.category || !productFields.price)
      throw new HttpException('Fileds are required', HttpStatus.BAD_REQUEST);
    const lastId = this.products[this.products.length - 1].id + 1 || 0;
    const newProduct = {
      id: lastId,
      ...productFields,
      createdAt: this.createdAt(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  getProductById(id) {
    const product = this.products.find((el) => el.id === +id);
    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    return product;
  }

  deleteProduct(id: number) {
    const index = this.products.findIndex((el) => el.id === +id);
    if (index === -1)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    const deletedProduct = this.products.splice(index, 1);
    return deletedProduct;
  }

  updateProduct(id: number, newFields: productsDTO) {
    const index = this.products.findIndex((el) => el.id === +id);
    if (index === -1)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    this.products[index] = {
      ...this.products[index],
      name: newFields.name,
      price: newFields.price,
    };
    return this.products[index];
  }
}
