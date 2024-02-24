import { z } from "zod";

export const productFilterSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  inCart: z.coerce.boolean().optional(),
  outCart: z.coerce.boolean().optional(),
});

export type ProductFilterSchema = z.infer<typeof productFilterSchema>;
