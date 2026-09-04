import { z } from "zod";

export const productSchema = z.object({
  productName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(200, "El nombre es demasiado largo"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(5000, "La descripción es demasiado larga"),
  price: z
    .string()
    .min(1, "El precio es requerido")
    .refine((v) => !isNaN(parseFloat(v)) && parseFloat(v) > 0, "El precio debe ser mayor a 0"),
  min: z
    .string()
    .refine((v) => !isNaN(parseInt(v)) && parseInt(v) >= 1, "La cantidad mínima debe ser al menos 1"),
  active: z.boolean(),
  isFeatured: z.boolean(),
  category: z.string().min(1, "Selecciona una categoría"),
});

export type ProductFormData = z.infer<typeof productSchema>;
