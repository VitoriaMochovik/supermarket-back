import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    create table product (
        id serial primary key,
        name varchar(255) not null,
        price float not null,
        qty_stock int not null
    );
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`drop table product;`);
}
