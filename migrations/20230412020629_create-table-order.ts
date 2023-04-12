import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    create table "order" (
        id serial primary key,
        name varchar(255) not null,
        dt_delivery date not null
    );
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`drop table order;`);
}
