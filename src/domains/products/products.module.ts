import { Module } from '@nestjs/common';

import { UnitOfWork } from '@/shared/infrastructure/database/unit-of-work';
import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [PrismaService, UnitOfWork, ProductRepository, ProductService],
})
export class ProductsModule {}
