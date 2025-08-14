import { nanoid } from 'nanoid';
import { OrderItem } from './order-item';

type CreateInput = {
  userId: string;
};

type RestoreInput = {
  id: string;
  userId: string;
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Order {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    public total: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  public static create(input: CreateInput): Order {
    return new Order(nanoid(), input.userId, 0.0);
  }

  public static restore(input: RestoreInput): Order {
    return new Order(
      input.id,
      input.userId,
      input.total,
      input.createdAt,
      input.updatedAt,
    );
  }

  public addItem(orderItem: OrderItem) {
    this.total += orderItem.product.price * orderItem.quantity;
  }
}
