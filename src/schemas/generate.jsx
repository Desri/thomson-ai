import { z } from 'zod';

export const generateSchema = z.object({
  ta_number: z.string().min(1, { message: 'Please enter a TA Number' }),
  summary_type: z.string().refine((val) => val !== "", {
    message: "Please select a Summary Type",
  }),
  additional_prompt: z.string().optional()
});
