"use client";
import { HTMLAttributes } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { FormDescription, FormLabel, FormControl, FormItem } from "../ui/form";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

export function TermsCheckbox(props: Props) {
  return (
    <FormItem className="items-top flex space-x-2">
      <FormControl>
        <Checkbox id="terms" {...props} />
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
      </div>
    </FormItem>
  );
}
