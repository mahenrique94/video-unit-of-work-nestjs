import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Injectable()
export class UnitOfWork {
  private logger = new Logger(UnitOfWork.name);

  public constructor(private readonly prisma: PrismaService) {}

  public async transaction(callback: () => Promise<any>) {
    this.logger.log('Starting transaction');

    const result = await this.prisma.startTransaction(callback);

    this.logger.log('Transaction committed');

    return result;
  }
}
