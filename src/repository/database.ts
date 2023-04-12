import { Injectable } from '@nestjs/common';
import knex, { Knex } from 'knex';

@Injectable()
export class Database {
  private readonly _knex: Knex;

  constructor() {
    this._knex = knex({
      client: 'pg',
      connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
    });
  }

  get knex() {
    return this._knex;
  }
}
