import { ProductEntity } from './product.entity';

export class OrderEntity {
  id: number;
  name: string;
  dtDelivery: Date;
  products: ProductEntity[];
}
