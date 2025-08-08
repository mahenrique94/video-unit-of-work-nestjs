import {
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  Post,
  Version,
} from '@nestjs/common';

import { ZodValidationPipe } from '@/shared/pipes/zod-validation.pipe';
import { UnitOfWork } from '@/shared/infrastructure/database/unit-of-work';

import {
  createOrderSchema,
  type CreateOrderDTO,
} from './dtos/input/create-order.dto';
import {
  createOrderItemSchema,
  type CreateOrderItemDTO,
} from './dtos/input/create-order-item.dto';
import { OrderService } from './order.service';
import { OrderItemService } from './order-item.service';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly service: OrderService,
    private readonly itemService: OrderItemService,
    private readonly uow: UnitOfWork,
  ) {}

  @Post()
  @Version('1')
  public async createOrder(
    @Body(new ZodValidationPipe(createOrderSchema)) body: CreateOrderDTO,
  ) {
    try {
      const record = await this.service.create(body);

      return {
        details: record,
        message: 'Order created successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException({
        error: {
          details: error as Error,
        },
      });
    }
  }

  @Post(':orderId/items')
  @Version('1')
  public async createOrderItem(
    @Param('orderId') orderId: string,
    @Body(new ZodValidationPipe(createOrderItemSchema.omit({ orderId: true })))
    body: Omit<CreateOrderItemDTO, 'orderId'>,
  ) {
    try {
      return await this.uow.transaction(async () => {
        const record = await this.itemService.create({
          ...body,
          orderId,
        });

        await this.service.updateTotal(record.orderId, record.id);

        return {
          details: record,
          message: 'Order item created successfully',
        };
      });
    } catch (error) {
      throw new InternalServerErrorException({
        error: {
          details: error as Error,
        },
      });
    }
  }
}
