"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  ForgotPasswordFormSchema,
  forgotPasswordFormSchema,
} from "@/lib/validations/auth.schemas";

export default function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
    mode: "onChange",
    defaultValues: {
      email_or_number: "",
    },
  });

  const submit = (data: ForgotPasswordFormSchema) => {
    console.log("forgot password data => ", data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="grid gap-4">
        <FormField
          name="email_or_number"
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

        <Button type="submit" className="w-full">
          Send reset email
        </Button>
      </form>
    </Form>
  );
}
