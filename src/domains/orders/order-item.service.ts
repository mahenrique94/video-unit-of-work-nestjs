import { Injectable } from '@nestjs/common';

import { CreateOrderItemDTO } from './dtos/input/create-order-item.dto';
import { OrderItemRepository } from './order-item.repository';
import { OrderItem } from './order-item';

@Injectable()
export class OrderItemService {
  constructor(private readonly repository: OrderItemRepository) {}

  public async create(input: CreateOrderItemDTO) {
    const record = await this.repository.persist(
      OrderItem.create({
        orderId: input.orderId,
        productId: input.productId,
        quantity: input.quantity,
      }),
    );

    return record;
  }
}
