import { z } from 'zod';

export const createOrderItemSchema = z.object({
  orderId: z.nanoid(),
  productId: z.nanoid(),
  quantity: z.number(),
});

export type CreateOrderItemDTO = z.infer<typeof createOrderItemSchema>;
