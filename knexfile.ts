import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: 'db',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'supermarket',
  },
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};

export default config;
