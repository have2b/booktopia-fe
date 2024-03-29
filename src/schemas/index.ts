import { addDays } from "date-fns";
import * as z from "zod";

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    message: "New password is required!",
    path: ["newPassword"]
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    message: "Password is required!",
    path: ["password"]
  })

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  })
  .regex(/^\S*$/, {message: "Username cannot contain any spaces.",}),
  password: z.string()
  .min(6, {
    message: "Your password must be at least 6 characters long.",
  })
  .regex(/[A-Z]/, "Your password must contain at least one uppercase letter (A-Z).")
  .regex(/[a-z]/, "Your password must contain at least one lowercase letter (a-z).") 
    .regex(/[0-9]/, "Your password must contain at least one digit (0-9).") 
    .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, "Your password must contain at least one special character.")
  ,
  email: z.string().email(),
  phoneNumber: z.string().regex(/^\d+$/),
  address: z.string().min(1),
  name: z.string().min(1, {
    message: "Full name is required",
  })
});

export const DateRangePickerSchema = z.object({
  dateRange: z.object({
    from: z.date({
      required_error: "Start date is required.",
    }),
    to: z.date({
      required_error: "End date is required.",
    })
    ,
  }).refine(
    (data) => data.from <= new Date(),
    "Start date must not be in the future"
  ),
});

export const ProductSchema = z.object({
  bookName: z.string().min(1),
    author: z.string().min(1),
    costPrice: z.coerce.number().positive(),
    sellPrice: z.coerce.number().positive(),
    categoryId: z.coerce.number().int().positive(),
    description: z.string().max(255),
    publisherId: z.coerce.number().int().positive(),
    imageUrl: z.string().max(255).optional(),
});

export const ProductImportQuantitySchema = z.object({
  bookId: z.coerce.number({ required_error: "BookId is required",}),
  quantity: z.coerce
  .number({ required_error: "Quantity is required",})
  .min(1, {
    message: "Quantity must be larger than 0"
  })
  .int({
    message: "Quantity must be integer"
  })
})

export const OrderStatusSchema = z.object({
  orderId: z.coerce
  .number({ required_error: "OrderId is required",}),
  status: z.string().regex(/^\d+$/),
})

export const UserActiveSchema = z.object({
  bookName: z.string().min(1),
  status: z.string(),
})