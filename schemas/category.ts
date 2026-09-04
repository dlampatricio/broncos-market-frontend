import { z } from "zod";

export const categorySchema = z.object({
  categoryName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre es demasiado largo"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
