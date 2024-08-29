"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
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
  RegisterFormSchema,
  registerFormSchema,
} from "@/lib/validations/auth.schemas";
import { TermsCheckbox } from "./terms";

export default function RegisterForm() {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email_or_number: "",
      password: "",
      confirm_password: "",
      terms: false,
    },
  });

  const submit = (data: RegisterFormSchema) => {
    console.log("register data => ", data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="first_name"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="first-name">First name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Max" required />
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
                  <Input {...field} placeholder="Max" required />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

        <FormField
          name="password"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Password" required />
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
                <Input {...field} placeholder="Confirm Password" required />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Create an account
        </Button>
        <Button variant="outline" className="w-full">
          Sign up with GitHub
        </Button>

        <FormField
          name="term"
          render={({ field }) => <TermsCheckbox {...field} />}
        />
      </form>
    </Form>
  );
}
