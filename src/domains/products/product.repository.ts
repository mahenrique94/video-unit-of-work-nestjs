import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

import { Product } from './product';
import { RecordNotFoundException } from '@/shared/exceptions/record-not-found.exception';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async persist(input: Product) {
    const record = await this.prisma.instance().product.create({
      data: {
        id: input.id,
        name: input.name,
        price: input.price,
        quantity: input.quantity,
      },
    });

    return Product.restore(record);
  }

  public async get(id: string) {
    const record = await this.prisma.instance().product.findFirst({
      where: {
        id,
      },
    });

    if (!record) {
      throw new RecordNotFoundException(`Product with id ${id} not found`);
    }

    return Product.restore(record);
  }
}
