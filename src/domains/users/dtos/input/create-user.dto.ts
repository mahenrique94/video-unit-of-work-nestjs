import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.email(),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
