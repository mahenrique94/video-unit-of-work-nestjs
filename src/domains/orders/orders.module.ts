import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/infrastructure/database/prisma.service';
import { UnitOfWork } from '@/shared/infrastructure/database/unit-of-work';

import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderItemRepository } from './order-item.repository';
import { OrderService } from './order.service';
import { OrderItemService } from './order-item.service';

@Module({
  controllers: [OrderController],
  providers: [
    PrismaService,
    UnitOfWork,
    OrderRepository,
    OrderItemRepository,
    OrderService,
    OrderItemService,
  ],
})
export class OrdersModule {}
