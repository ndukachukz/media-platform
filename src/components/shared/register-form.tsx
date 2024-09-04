"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Notification, PasswordInput, Button, Input } from "@mantine/core";
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
  RegisterFormSchema,
  registerFormSchema,
} from "@/lib/validations/auth.schemas";
import Image from "next/image";
import { handleGoogleSignIn } from "@/lib/actions/auth/signin";
import { useMutation } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { Checkbox } from "../ui/checkbox";
import { XIcon } from "lucide-react";
import { redirect } from "next/navigation";

const register = async (
  data: RegisterFormSchema
): Promise<RegisterFormSchema> => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create user");
  }
  return response.json();
};

export default function RegisterForm() {
  const [showError, setShowError] = useState<boolean>(false);
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: RegisterFormSchema) => {
      return register({
        email_or_phone: data.email_or_phone,
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.password,
        confirm_password: data.confirm_password,
        terms: data.terms,
      });
    },
    onSuccess: () => {
      const queryClient = new QueryClient();
      queryClient.invalidateQueries({
        queryKey: ["register"],
      });
      redirect("/dashboard");
    },
    onError: (error) => {
      setShowError(true);
    },
  });

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email_or_phone: "",
      password: "",
      confirm_password: "",
      terms: undefined,
    },
  });

  const submit = (data: RegisterFormSchema) => {
    console.log("register data => ", data);
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="grid gap-4 ">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="first_name"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="first-name">First name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John" required />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="last_name"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="last-name">Last name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Doe" required />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="email_or_phone"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="email">Email or Mobile Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Email or Mobile Number"
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
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} placeholder="Password" required />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="confirm_password"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  placeholder="Confirm Password"
                  required
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" loading={isPending}>
          Create an account
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
        >
          <Image
            src={
              "https://res.cloudinary.com/dj753bxhx/image/upload/v1724966399/bycjoskbljrypwucpdpb.svg"
            }
            alt="register with google"
            width={500}
            height={500}
            className="w-10 h-7"
          />
          Register with Google
        </Button>

        <FormField
          name="terms"
          render={({ field }) => (
            <FormItem className="items-top flex space-x-2">
              <FormControl>
                <Checkbox
                  id="terms"
                  {...field}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  required
                />
              </FormControl>
              <div className="grid gap-1.5 leading-none">
                <FormLabel
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </FormLabel>
                <FormDescription className="text-sm text-muted-foreground">
                  You agree to our Terms of Service and Privacy Policy.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </form>
      <div className={"relative"}>
        <div className="sticky top-16">
          {isPending && showError && (
            <Notification loading title="Registering...">
              You are being registered. Please hold on a sec.
            </Notification>
          )}
          {isError && showError && (
            <Notification
              icon={XIcon}
              color="red"
              title="Bummer!"
              withBorder
              onClose={() => {
                setShowError(false);
              }}
            >
              Something went wrong. This email might have been used, or your
              password is incorrect.
            </Notification>
          )}
        </div>
      </div>
    </Form>
  );
}
