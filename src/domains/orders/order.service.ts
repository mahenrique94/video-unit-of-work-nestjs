import { Injectable } from '@nestjs/common';

import { CreateOrderDTO } from './dtos/input/create-order.dto';
import { OrderRepository } from './order.repository';
import { Order } from './order';
import { OrderItemRepository } from './order-item.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
  ) {}

  public async create(input: CreateOrderDTO) {
    const record = await this.repository.persist(
      Order.create({
        userId: input.userId,
      }),
    );

    return record;
  }

  public async updateTotal(orderId: string, orderItemId: string) {
    const order = await this.repository.get(orderId);
    const item = await this.orderItemRepository.get(orderItemId);

    order.addItem(item);

    await this.repository.persist(order);
  }
}
