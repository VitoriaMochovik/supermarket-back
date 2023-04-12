import { Controller, Get, Res } from '@nestjs/common';
import { ProductService } from '../../service/product/product.service';
import { Response } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  async get(@Res() res: Response) {
    try {
      const result = await this.productService.findAll();

      res.status(200).send(result);
    } catch (err) {
      console.log(err);

      res.status(500).send({
        message: 'Erro interno. Por favor tente novamente mais tarde.',
      });
    }
  }
}
