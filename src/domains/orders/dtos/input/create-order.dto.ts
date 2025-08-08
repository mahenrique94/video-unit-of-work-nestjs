import { z } from 'zod';

export const createOrderSchema = z.object({
  userId: z.nanoid(),
});

export type CreateOrderDTO = z.infer<typeof createOrderSchema>;
