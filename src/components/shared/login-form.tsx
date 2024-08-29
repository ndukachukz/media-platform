"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  LoginFormSchema,
  loginFormSchema,
} from "@/lib/validations/auth.schemas";

export default function LoginForm() {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
    defaultValues: {
      email_or_number: "",
      password: "",
    },
  });

  const submit = (data: LoginFormSchema) => {
    console.log("login data => ", data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="grid gap-4 ">
        <FormField
          name="email_or_number"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="email">Email or Mobile Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Email or Phone Number"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <div className="flex items-center">
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <Input id="password" type="password" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </form>
    </Form>
  );
}
