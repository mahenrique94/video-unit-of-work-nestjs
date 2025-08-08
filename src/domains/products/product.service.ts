import { Injectable } from '@nestjs/common';

import { CreateProductDTO } from './dtos/input/create-product.dto';
import { ProductRepository } from './product.repository';
import { Product } from './product';

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  public async create(input: CreateProductDTO) {
    const record = await this.repository.persist(
      Product.create({
        name: input.name,
        price: input.price,
      }),
    );

    return record;
  }
}
