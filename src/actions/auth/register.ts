"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import axios, { AxiosError } from "axios";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name, address, phoneNumber, username } = validatedFields.data;
  try {
    const response = await axios.post(process.env.BACKEND_API + "/Authenticate/register", {
      email,
      password,
      name,
      address,
      phoneNumber,
      username
    });
    return { success: "Register successfully!" };
  } catch (error) {
    const axiosError = error as AxiosError;
    const message = (axiosError.response?.data as any)?.error?.message;
    return { error:  message};
  }
  
};
