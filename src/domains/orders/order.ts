import { nanoid } from 'nanoid';
import { OrderItem } from './order-item';

type CreateInput = {
  userId: string;
};

type RestoreInput = {
  id: string;
  userId: string;
  total: number;
};

export class Order {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    public total: number,
  ) {}

  public static create(input: CreateInput): Order {
    return new Order(nanoid(), input.userId, 0.0);
  }

  public static restore(input: RestoreInput): Order {
    return new Order(input.id, input.userId, input.total);
  }

  public addItem(orderItem: OrderItem) {
    this.total += orderItem.product.price * orderItem.quantity;
  }
}
