import { z } from "zod";

export const searchBookSchema = z.object({
  bookName: z.string().max(200).optional(),
  categoryId: z.string().optional(),
  author: z.string().max(100).optional(),
  publisherName: z.string().max(100).optional(),
});

export const updateInfoSchema = z.object({
  userName: z.string().max(100),
  name: z.string().max(200),
  phoneNumber: z.string().max(10),
  email: z.string().email(),
  address: z.string().max(255),
});
