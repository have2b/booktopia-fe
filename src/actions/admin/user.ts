"use server"    
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import axios, { AxiosError } from "axios";
import { ApiResponse, User } from "@/models";
export const GetUsers = async () => {
    const session = await getServerSession(authOptions);
    try {
      const response = await axios.get<ApiResponse<User[]>>(process.env.BACKEND_API  + `/Users`,
      {
        headers: {
          "Authorization": `Bearer ${session?.user.accessToken}` //the token is a variable which holds the token
        }
       });
      return response.data;
    } catch (error) {
        console.log(error);
  
      const axiosError = error as AxiosError;
      const message = (axiosError.response?.data as any)?.error;
      return <ApiResponse<User[]>>{ error:  message};
    }
    
};

export const UpdateUserActive = async (userName: string, isActive: boolean) => {
    const session = await getServerSession(authOptions);
    try {
      const response = await axios.put<ApiResponse<string>>(process.env.BACKEND_API + `/Users/set-active`, {
        userName,
        isActive
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
        return <ApiResponse<string>>{ error:  message};
    }
    
  };