import { Injectable } from '@nestjs/common';
import { CreateDto } from '../../controller/order/dto/create.dto';
import { OrderRepository } from '../../repository/order.repository';
import { ProductAvailableValidator } from '../../validator/product-available/product-available.validator';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private productAvailableValidator: ProductAvailableValidator,
  ) {}

  async create(body: CreateDto) {
    await this.productAvailableValidator.execute(body.products);

    await this.orderRepository.create(
      {
        name: body.name,
        dtDelivery: body.dtDelivery,
      },
      body.products,
    );
  }
}
