import { Injectable } from '@nestjs/common';
import knex, { Knex } from 'knex';

@Injectable()
export class Database {
  private _knex: Knex;

  constructor() {
    this._knex = knex({
      client: 'pg',
      connection: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'supermarket',
      },
    });
  }

  get knex() {
    return this._knex;
  }
}
