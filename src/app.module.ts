import { Module } from '@nestjs/common';
import { Database } from './repository/database';
import { OrderRepository } from './repository/order.repository';
import { ProductRepository } from './repository/product.repository';
import { OrderService } from './service/order/order.service';
import { ProductService } from './service/product/product.service';
import { ProductAvailableValidator } from './validator/product-available/product-available.validator';
import { OrderController } from './controller/order/order.controller';
import { ProductController } from './controller/product/product.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [OrderController, ProductController],
  providers: [
    Database,
    OrderRepository,
    ProductRepository,
    OrderService,
    ProductService,
    ProductAvailableValidator,
  ],
})
export class AppModule {
  constructor() {}
}
