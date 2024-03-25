"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ProductSearchParams } from "@/hooks/useProductSearchParamsStore";
import { encodeQueryString } from "@/lib/utils";
import { ApiResponse, Book, BookPagination } from "@/models";
import { ProductImportQuantitySchema, ProductSchema } from "@/schemas";
import axios, { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { z } from "zod";

export const getBooks = async (searchParams: ProductSearchParams) => {
    const session = await getServerSession(authOptions);
    const {pageIndex, pageSize, sortType} = searchParams;
    try {
      const response = await axios.get<ApiResponse<BookPagination>>(process.env.BACKEND_API  + `/Books?pageIndex=${pageIndex}&sort=${sortType}&pageSize=${pageSize}&`+
      encodeQueryString(searchParams.params),
      {
        headers: {
          "Authorization": `Bearer ${session?.user.accessToken}` //the token is a variable which holds the token
        }
       });
      return response.data;
    } catch (error) {
  
      const axiosError = error as AxiosError;
      const message = (axiosError.response?.data as any)?.error;
      return <ApiResponse<BookPagination>>{ error:  message};
    }
    
};

export const CreateBook = async (values: z.infer<typeof ProductSchema>) => {
  const validatedFields = ProductSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const session = await getServerSession(authOptions);
  const { categoryId, costPrice, publisherId, author, bookName, sellPrice, description, imageUrl } = validatedFields.data;
  try {
    const response = await axios.post(process.env.BACKEND_API + "/Books", {
      categoryId, costPrice, publisherId, author, bookName, sellPrice, description, imageUrl
    },
    {
        headers: {
          "Authorization": `Bearer ${session?.user.accessToken}` //the token is a variable which holds the token
        }
       });
    return { success: "Add new book successfully!" };
  } catch (error) {
    const axiosError = error as AxiosError;
    const message = (axiosError.response?.data as any)?.error?.message;
    return { error:  message};
  }
  
};


export const getBookById = async (id: number) => {
  const session = await getServerSession(authOptions);
  try {
    const response = await axios.get<ApiResponse<Book>>(process.env.BACKEND_API  + `/Books/${id}`,
    {
      headers: {
        "Authorization": `Bearer ${session?.user.accessToken}` //the token is a variable which holds the token
      }
     });
    return response.data;
  } catch (error) {

    const axiosError = error as AxiosError;
    const message = (axiosError.response?.data as any)?.error;
    return <ApiResponse<Book>>{ error:  message};
  }
  
};

export const EditBook = async (bookId : number ,values: z.infer<typeof ProductSchema>) => {
  const validatedFields = ProductSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  if(isNaN(bookId)){
    return { error: "Not found this book!!" };
  }
  const session = await getServerSession(authOptions);
  const { categoryId, costPrice, publisherId, author, bookName, sellPrice, description, imageUrl } = validatedFields.data;
  try {
    const response = await axios.put(process.env.BACKEND_API + `/Books/${bookId}`, {
      categoryId, costPrice, publisherId, author, bookName, sellPrice, description, imageUrl
    },
    {
        headers: {
          "Authorization": `Bearer ${session?.user.accessToken}` //the token is a variable which holds the token
        }
       });
    return { success: "Edit book successfully!" };
  } catch (error) {
    const axiosError = error as AxiosError;
    const message = (axiosError.response?.data as any)?.error?.message;
    return { error:  message};
  }
  
};

export const DeleteBookById = async (id: number) => {
  const session = await getServerSession(authOptions);
  try {
    const response = await axios.delete(process.env.BACKEND_API  + `/Books/${id}`,
    {
      headers: {
        "Authorization": `Bearer ${session?.user.accessToken}` //the token is a variable which holds the token
      }
     });
     return { success: "Delete successfully!" };
  } catch (error) {
    const axiosError = error as AxiosError;
    const message = (axiosError.response?.data as any)?.error?.message;
    return { error:  message};
  }
  
};

export const ImportBook = async (values: z.infer<typeof ProductImportQuantitySchema>) => {
  const validatedFields = ProductImportQuantitySchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const {bookId, quantity } = validatedFields.data;
  if(isNaN(bookId)){
    return { error: "Not found this book!!" };
  }
  const session = await getServerSession(authOptions);
  
  try {
    const response = await axios.post(process.env.BACKEND_API + `/Books/import`, {
      bookId, quantity
    },
    {
        headers: {
          "Authorization": `Bearer ${session?.user.accessToken}` //the token is a variable which holds the token
        }
       });
    return { success: "Import book successfully!" };
  } catch (error) {
    const axiosError = error as AxiosError;
    const message = (axiosError.response?.data as any)?.error?.message;
    return { error:  message};
  }
  
};