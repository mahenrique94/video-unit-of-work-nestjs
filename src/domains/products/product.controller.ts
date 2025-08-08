import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Version,
} from '@nestjs/common';

import { ZodValidationPipe } from '@/shared/pipes/zod-validation.pipe';

import {
  createProductSchema,
  type CreateProductDTO,
} from './dtos/input/create-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post()
  @Version('1')
  public async createOrder(
    @Body(new ZodValidationPipe(createProductSchema)) body: CreateProductDTO,
  ) {
    try {
      const record = await this.service.create(body);

      return {
        details: record,
        message: 'Product created successfully',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        error: {
          details: error as Error,
        },
      });
    }
  }
}
