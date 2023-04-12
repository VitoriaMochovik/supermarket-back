import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../repository/product.repository';
import { ProductEntity } from '../../entity/product.entity';

@Injectable()
export class ProductAvailableValidator {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(
    productsToVerify: (Pick<ProductEntity, 'id'> & { qty: number })[],
  ) {
    const products = await this.productRepository.findByIds(
      productsToVerify.map((p) => p.id),
    );

    for (const p of productsToVerify) {
      const productFinded = products.find((product) => product.id === p.id);

      if (!productFinded) {
        throw new NotFoundException(`Produto ${p.id} não encontrado`);
      }

      if (p.qty > productFinded.qtyStock) {
        throw new NotFoundException(
          `Produto ${productFinded.name} não possui estoque suficiente`,
        );
      }
    }

    return products;
  }
}
