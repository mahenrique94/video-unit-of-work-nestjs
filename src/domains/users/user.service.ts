import { Injectable } from '@nestjs/common';

import { CreateUserDTO } from './dtos/input/create-user.dto';
import { UserRepository } from './user.repository';
import { User } from './user';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  public async create(input: CreateUserDTO) {
    const record = await this.repository.persist(
      User.create({
        name: input.name,
        email: input.email,
      }),
    );

    return record;
  }
}
