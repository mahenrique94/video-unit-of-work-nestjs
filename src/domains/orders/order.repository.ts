import { Injectable } from '@nestjs/common';
import { Order } from './order';
import { PrismaService } from '@/shared/infrastructure/database/prisma.service';
import { RecordNotFoundException } from '@/shared/exceptions/record-not-found.exception';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async persist(input: Order) {
    if (input.id) {
      const record = await this.prisma.instance().order.update({
        data: {
          total: input.total,
        },
        where: {
          id: input.id,
        },
      });

      return Order.restore(record);
    } else {
      const record = await this.prisma.instance().order.create({
        data: {
          id: input.id,
          total: input.total,
          userId: input.userId,
        },
      });

      return Order.restore(record);
    }
  }

  public async get(id: string) {
    const record = await this.prisma.instance().order.findFirst({
      where: {
        id,
      },
    });

    if (!record) {
      throw new RecordNotFoundException(`Order with id ${id} not found`);
    }

    return Order.restore(record);
  }
}
