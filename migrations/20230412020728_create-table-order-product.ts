import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    create table order_product (
        id serial primary key,
        id_order int constraint fk_order_product_ref_order_order_id references "order",
        id_product int constraint fk_order_product_ref_product_product_id references product,
        qty int not null
    );
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`drop table order_product;`);
}
