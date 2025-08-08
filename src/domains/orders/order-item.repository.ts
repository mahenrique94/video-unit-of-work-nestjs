import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

import { OrderItem } from './order-item';
import { Order } from './order';
import { Product } from '../products/product';
import { RecordNotFoundException } from '@/shared/exceptions/record-not-found.exception';

@Injectable()
export class OrderItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async get(id: string) {
    const record = await this.prisma.instance().orderItem.findFirst({
      where: {
        id,
      },
      include: {
        order: true,
        product: true,
      },
    });

    if (!record) {
      throw new RecordNotFoundException(`Order item with id ${id} not found`);
    }

    return OrderItem.restore({
      id: record.id,
      orderId: record.orderId,
      productId: record.productId,
      quantity: record.quantity,
      order: Order.restore(record.order),
      product: Product.restore(record.product),
    });
  }

  public async persist(input: OrderItem) {
    const record = await this.prisma.instance().orderItem.create({
      data: {
        id: input.id,
        orderId: input.orderId,
        productId: input.productId,
        quantity: input.quantity,
      },
      include: {
        order: true,
        product: true,
      },
    });

    return OrderItem.restore({
      id: record.id,
      orderId: record.orderId,
      productId: record.productId,
      quantity: record.quantity,
      order: Order.restore(record.order),
      product: Product.restore(record.product),
    });
  }
}
