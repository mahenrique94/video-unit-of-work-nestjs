import { nanoid } from 'nanoid';

type CreateInput = {
  name: string;
  price: number;
};

type RestoreInput = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export class Product {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly quantity: number,
  ) {}

  public static create(input: CreateInput): Product {
    return new Product(nanoid(), input.name, input.price, 0.0);
  }

  public static restore(input: RestoreInput): Product {
    return new Product(input.id, input.name, input.price, input.quantity);
  }
}
