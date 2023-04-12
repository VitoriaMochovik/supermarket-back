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
    const transaction = await this.database.knex.transaction();

    try {
      const [result] = await transaction('order')
        .insert(snakecaseKeys(order))
        .returning('*');

      await transaction('order_product').insert(
        products.map((product) => ({
          id_order: result.id,
          id_product: product.id,
          qty: product.qty,
        })),
      );

      const promises = products.map(async (product) => {
        await transaction.raw(
          `
        update product set qty_stock = qty_stock - ? where id = ?;
      `,
          [product.qty, product.id],
        );
      });

      await Promise.all(promises);

      transaction.commit();
    } catch (err) {
      transaction.rollback();

      throw err;
    }
  }
}
