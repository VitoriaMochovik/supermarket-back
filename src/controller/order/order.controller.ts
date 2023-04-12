import { Body, Controller, HttpException, Post, Res } from '@nestjs/common';
import { OrderService } from '../../service/order/order.service';
import { Response } from 'express';
import { CreateDto } from './dto/create.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Res() res: Response, @Body() body: CreateDto) {
    try {
      await this.orderService.create(body);

      return res.status(200).send({ message: 'Ordem realizada com sucesso!' });
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException) {
        return res.status(err.getStatus()).send({ message: err.message });
      }

      res.status(500).send({
        message: 'Erro interno. Por favor tente novamente mais tarde.',
      });
    }
  }
}
