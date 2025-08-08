import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/infrastructure/database/prisma.service';
import { UnitOfWork } from '@/shared/infrastructure/database/unit-of-work';

import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [PrismaService, UnitOfWork, UserRepository, UserService],
})
export class UsersModule {}
