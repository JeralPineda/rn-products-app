import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Ingrese un correo válido"),
  password: z.string().min(5, "La contraseña debe contener al menos 5 caracteres"),
});

export const RegisterSchema = z.object({
  email: z.string().email("Ingrese un correo válido"),
  password: z.string().min(5, "La contraseña debe contener al menos 5 caracteres"),
  fullName: z.string().min(2, "El nombre debe contener al menos 2 caracteres"),
});
