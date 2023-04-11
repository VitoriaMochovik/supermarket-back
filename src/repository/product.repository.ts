import { Injectable } from '@nestjs/common';
import { Database } from './database';

@Injectable()
export class ProductRepository {
  constructor(private database: Database) {}

  async findAll() {
    const result = await this.database.knex('product').select();
  }
}
