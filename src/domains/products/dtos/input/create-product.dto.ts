import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(2).max(255),
  price: z.number().min(0.01),
});

export type CreateProductDTO = z.infer<typeof createProductSchema>;
