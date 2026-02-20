import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
});

export const quoteItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  title: z.string(),
  quantity: z.number().min(50, "Minimum order quantity is 50 units").multipleOf(10, "Quantity must be in increments of 10"),
  imageUrl: z.string(),
  moq: z.number(),
});

export const brochureDownloadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  phone: z.string().optional(),
});

export const profileUpdateSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  phone: z.string().optional(),
});

export const productFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(1, "Category is required"),
  categorySlug: z.string().min(1, "Category slug is required"),
  moq: z.number().min(50, "MOQ must be at least 50"),
  tags: z.string(),
  featured: z.boolean(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type RegisterFormValues = z.infer<typeof registerFormSchema>;
export type QuoteItemValues = z.infer<typeof quoteItemSchema>;
export type BrochureDownloadValues = z.infer<typeof brochureDownloadSchema>;
export type ProfileUpdateValues = z.infer<typeof profileUpdateSchema>;
export type ProductFormValues = z.infer<typeof productFormSchema>;
