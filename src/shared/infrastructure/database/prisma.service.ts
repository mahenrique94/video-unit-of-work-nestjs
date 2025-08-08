import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private _client: PrismaClient | Prisma.TransactionClient;

  public async onModuleInit() {
    await this.$connect();
  }

  public instance(): PrismaClient | Prisma.TransactionClient {
    return this._client || this;
  }

  public async startTransaction(callback: () => Promise<void>) {
    const result = await this.$transaction(async (tx) => {
      this._client = tx;
      return await callback();
    });

    this._client = this;

    return result;
  }
}
