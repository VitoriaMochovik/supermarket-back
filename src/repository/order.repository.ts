import { Injectable } from '@nestjs/common';
import { Database } from './database';
import { OrderEntity } from '../entity/order.entity';
import snakecaseKeys from 'snakecase-keys';
import { ProductEntity } from '../entity/product.entity';

@Injectable()
export class OrderRepository {
  constructor(private readonly database: Database) {}

  async create(
    order: Omit<OrderEntity, 'products' | 'id'>,
    products: (Pick<ProductEntity, 'id'> & { qty: number })[],
  ) {
    const [result] = await this.database
      .knex('order')
      .insert(snakecaseKeys(order))
      .returning('*');

    await this.database.knex('order_product').insert(
      products.map((product) => ({
        id_order: result.id,
        id_product: product.id,
        qty: product.qty,
      })),
    );

    const promises = products.map(async (product) => {
      await this.database
        .knex('product')
        .update('qty_stock', `qty_stock - ${product.qty}`)
        .where({ id: product.id });
    });

    await Promise.all(promises);
  }
}
