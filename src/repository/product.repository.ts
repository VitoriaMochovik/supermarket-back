import { Injectable } from '@nestjs/common';
import { Database } from './database';
import { ProductEntity } from '../entity/product.entity';
import camelcaseKeys from 'camelcase-keys';

@Injectable()
export class ProductRepository {
  constructor(private readonly database: Database) {}

  async findAll(): Promise<ProductEntity[]> {
    const result = await this.database.knex('product').select('*');

    return camelcaseKeys(result);
  }

  async findByIds(ids: number[]): Promise<ProductEntity[]> {
    const result = await this.database
      .knex('product')
      .select('*')
      .whereIn('id', ids);

    return camelcaseKeys(result);
  }
}
