import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../repository/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAll() {
    const products = await this.productRepository.findAll();
    return products.filter((product) => product.qtyStock);
  }
}
