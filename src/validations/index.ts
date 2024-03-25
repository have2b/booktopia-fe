import { z } from "zod";

export const searchBookSchema = z.object({
  bookName: z.string().max(200).optional(),
  categoryId: z.string().optional(),
  author: z.string().max(100).optional(),
  publisherName: z.string().max(100).optional(),
});
