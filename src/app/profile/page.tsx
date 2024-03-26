"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserInfo } from "@/models";
import { updateInfoSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { z } from "zod";

export default function Profile() {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const { data: session } = useSession();

  useEffect(() => {
    axios
      .get<{ payload: UserInfo }>(
        `http://localhost:7105/api/users/user-profile`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`, //the token is a variable which holds the token
          },
        }
      )
      .then((res) => {
        setUserInfo(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [session?.user.accessToken]);

  const form = useForm<z.infer<typeof updateInfoSchema>>({
    resolver: zodResolver(updateInfoSchema),
    defaultValues: userInfo,
  });

  useEffect(() => {
    form.reset(userInfo);
  }, [userInfo]);

  function onSubmit(values: z.infer<typeof updateInfoSchema>) {
    axios
      .put<{ payload: UserInfo }>(`http://localhost:7105/api/Users`, values, {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`, //the token is a variable which holds the token
        },
      })
      .then((res) => {
        swal("Update successful", "Updated your information", "success");
      })
      .catch((err) => {
        console.log(err);
      });
    form.reset(values);
  }
  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/3 space-y-8 bg-white shadow-lg rounded-lg px-10 py-6 mt-10"
        >
          <p className="!text-4xl !font-bold text-center uppercase">
            Change infomation
          </p>
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormLabel>Your username</FormLabel>
                <FormControl>
                  <Input placeholder="testusername" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your name</FormLabel>
                <FormControl>
                  <Input placeholder="Doraemon..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your name</FormLabel>
                <FormControl>
                  <Input placeholder="18008198" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="abc@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publisher</FormLabel>
                <FormControl>
                  <Input placeholder="72th Hang Gai St..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update</Button>
        </form>
      </Form>
    </div>
  );
}
