"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ApiResponse, Order, OrderDetail } from "@/models";
import axios, { AxiosError } from "axios";
import { getServerSession } from "next-auth";

export const GetOrders = async () => {
    const session = await getServerSession(authOptions);
    try {
      const response = await axios.get<ApiResponse<Order[]>>(process.env.BACKEND_API  + `/Orders?latest=true`,
      {
        headers: {
          "Authorization": `Bearer ${session?.user.accessToken}` //the token is a variable which holds the token
        }
       });
       console.log(response.data.payload);
      return response.data;
    } catch (error) {
        console.log(error);
  
      const axiosError = error as AxiosError;
      const message = (axiosError.response?.data as any)?.error;
      return <ApiResponse<Order[]>>{ error:  message};
    }
    
};

export const GetOrderDetailByOrderId = async (orderId: number) => {
    const session = await getServerSession(authOptions);
    try {
      const response = await axios.get<ApiResponse<OrderDetail[]>>(process.env.BACKEND_API  + `/Orders/${orderId}/OrderDetails`,
      {
        headers: {
          "Authorization": `Bearer ${session?.user.accessToken}` //the token is a variable which holds the token
        }
       });
       console.log(response.data.payload);
      return response.data;
    } catch (error) {
        console.log(error);
  
      const axiosError = error as AxiosError;
      const message = (axiosError.response?.data as any)?.error;
      return <ApiResponse<OrderDetail[]>>{ error:  message};
    }
    
};

export const getOrderById = async (id: number) => {
    const session = await getServerSession(authOptions);
    try {
      const response = await axios.get<ApiResponse<Order>>(process.env.BACKEND_API  + `/Orders/${id}`,
      {
        headers: {
          "Authorization": `Bearer ${session?.user.accessToken}` //the token is a variable which holds the token
        }
       });
      return response.data;
    } catch (error) {
  
      const axiosError = error as AxiosError;
      const message = (axiosError.response?.data as any)?.error;
      return <ApiResponse<Order>>{ error:  message};
    }
    
  };

  export const UpdateOrderStatus = async (orderId: number, status: number) => {
    if(isNaN(orderId) || isNaN(status)){
      return  <ApiResponse<Order>>{ error:  {code:400, message:"Invalid request"}};
    }
    const session = await getServerSession(authOptions);
    
    try {
      const response = await axios.put<ApiResponse<Order>>(process.env.BACKEND_API + `/Orders/${orderId}/status`, {
        status
      },
      {
          headers: {
            "Authorization": `Bearer ${session?.user.accessToken}` //the token is a variable which holds the token
          }
         });
         return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        const message = (axiosError.response?.data as any)?.error;
        return <ApiResponse<Order>>{ error:  message};
    }
    
  };