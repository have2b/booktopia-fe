"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import React, { useRef } from "react";
import swal from "sweetalert";
import { useRouter, useSearchParams } from "next/navigation";
import { log } from "console";

const LoginForm = () => {
  const router = useRouter();
  const userName = useRef("");
  const pass = useRef("");
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");
  const onSubmit = async () => {
    const res = await signIn("credentials", {
      username: userName.current,
      password: pass.current,
      redirect: false,
      callbackUrl: callbackUrl ?? "/",
    });
    if (res?.ok) {
      router.push(res.url ? res.url : "/");
    } else {
      swal("Oops!", "Credentials do not match!", "error");
    }
  };
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your username and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              required
              type="text"
              onChange={(e) => (userName.current = e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              required
              type="password"
              onChange={(e) => (pass.current = e.target.value)}
            />
          </div>
          <Button onClick={onSubmit} className="w-full">
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
