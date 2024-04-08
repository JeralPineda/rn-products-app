import {z} from "zod";

export const ProductSchema = z.object({
  title: z.string().min(2, "El nombre debe contener al menos 2 caracteres"),
  slug: z.string().min(2, "El nombre debe contener al menos 2 caracteres"),
  description: z
    .string()
    .min(2, "El nombre debe contener al menos 2 caracteres"),
  price: z.string().min(2, "El nombre debe contener al menos 2 caracteres"),
  stock: z.string().min(2, "El nombre debe contener al menos 2 caracteres"),
});
