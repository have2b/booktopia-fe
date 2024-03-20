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
