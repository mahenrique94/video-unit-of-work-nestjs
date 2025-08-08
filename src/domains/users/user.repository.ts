import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

import { User } from './user';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async persist(input: User) {
    const record = await this.prisma.instance().user.create({
      data: {
        id: input.id,
        email: input.email,
        name: input.name,
      },
    });

    return User.restore(record);
  }
}
