"use server";

import * as z from "zod";
import { DateRangePickerSchema, RegisterSchema } from "@/schemas";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/models";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SalesProps } from "@/components/admin/sales-card";

type StatisticsByDateRange = {
    revenue: number,
    profit: number,
    numberOfOrders: number,
}


export const getStatisticsByDateRange = async (values: z.infer<typeof DateRangePickerSchema>) => {
  const session = await getServerSession(authOptions);
  const validatedFields = DateRangePickerSchema.safeParse(values);

  if (!validatedFields.success) {
    return <ApiResponse<StatisticsByDateRange>>{ error: {code: 400, message: "Invalid fields!"} } ;
  }
  const {dateRange} = validatedFields.data;

  try {
    const response = await axios.get<ApiResponse<StatisticsByDateRange>>(process.env.BACKEND_API  + `/Statistics/total-revenue-profit-sale?start-date=${dateRange.from.toLocaleString()}&end-date=${dateRange.to.toLocaleString()}`,
    {
      headers: {
        "Authorization": `Bearer ${session?.user.accessToken}` //the token is a variable which holds the token
      }
     });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const message = (axiosError.response?.data as any)?.error;
    return <ApiResponse<StatisticsByDateRange>>{ error:  message};
  }
  
};

export const getRevenueOverview = async (year: number | undefined) => {
  const session = await getServerSession(authOptions);
  if(!year){
    year = new Date().getFullYear();
  }
  try {
    const response = await axios.get<ApiResponse<number[]>>(process.env.BACKEND_API  + `/Statistics/revenue-overview?year=${year}`,
    {
      headers: {
        "Authorization": `Bearer ${session?.user.accessToken}` //the token is a variable which holds the token
      }
     });
    return response.data;
  } catch (error) {

    const axiosError = error as AxiosError;
    const message = (axiosError.response?.data as any)?.error;
    return <ApiResponse<number[]>>{ error:  message};
  }
  
};

export const getRecentSales = async () => {
  const session = await getServerSession(authOptions);
  var PageIndex = 0;
  var PageSize = 5;
  try {
    const response = await axios.get<ApiResponse<SalesProps[]>>(process.env.BACKEND_API  + `/Statistics/recent-sales?PageIndex=${PageIndex}&PageSize=${PageSize}`,
    {
      headers: {
        "Authorization": `Bearer ${session?.user.accessToken}` //the token is a variable which holds the token
      }
     });
    return response.data;
  } catch (error) {

    const axiosError = error as AxiosError;
    const message = (axiosError.response?.data as any)?.error;
    return <ApiResponse<SalesProps[]>>{ error:  message};
  }
  
};

