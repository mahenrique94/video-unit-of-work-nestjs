import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Version,
} from '@nestjs/common';

import { ZodValidationPipe } from '@/shared/pipes/zod-validation.pipe';

import {
  createUserSchema,
  type CreateUserDTO,
} from './dtos/input/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @Version('1')
  public async createOrder(
    @Body(new ZodValidationPipe(createUserSchema)) body: CreateUserDTO,
  ) {
    try {
      const record = await this.service.create(body);

      return {
        details: record,
        message: 'User created successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException({
        error: {
          details: error as Error,
        },
      });
    }
  }
}
