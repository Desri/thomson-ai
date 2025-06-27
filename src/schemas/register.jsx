import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  username: z.string().min(1, { message: 'Username is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
  mcr_number: z.string().min(1, { message: 'MCR Number is required' }),
  role: z.string().refine((val) => val !== "", {
    message: "Role is required",
  }),
});
