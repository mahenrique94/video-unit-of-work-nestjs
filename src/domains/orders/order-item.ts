import { nanoid } from 'nanoid';
import { Order } from './order';
import { Product } from '../products/product';

type CreateInput = {
  orderId: string;
  productId: string;
  quantity: number;
};

type RestoreInput = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  order?: Order;
  product?: Product;
};

export class OrderItem {
  public order: Order;
  public product: Product;

  private constructor(
    public readonly id: string,
    public readonly orderId: string,
    public readonly productId: string,
    public readonly quantity: number,
  ) {}

  public static create(input: CreateInput): OrderItem {
    return new OrderItem(
      nanoid(),
      input.orderId,
      input.productId,
      input.quantity,
    );
  }

  public static restore(input: RestoreInput): OrderItem {
    const orderItem = new OrderItem(
      input.id,
      input.orderId,
      input.productId,
      input.quantity,
    );

    if (input.order) {
      orderItem.order = Order.restore(input.order);
    }

    if (input.product) {
      orderItem.product = Product.restore(input.product);
    }

    return orderItem;
  }
}
