"use client";
import { useState } from "react";
import {
  IconUserCheck,
  IconMailOpened,
  IconCircleCheck,
} from "@tabler/icons-react";
import {
  Card,
  Stepper,
  rem,
  Button,
  Group,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import FileDropzone from "./file-dropzone";
import AccountTypeCard from "./account-type-card";
import { useForm } from "react-hook-form";
import { ProfileCreateSchema } from "@/types/user.type";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useMutation } from "@tanstack/react-query";

export default function OnboardingStepper() {
  const forms = useForm<ProfileCreateSchema>({
    defaultValues: {
      first_name: "",
      last_name: "",
      image: "",
      role: "USER",
      bio: "",
    },
  });
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: ProfileCreateSchema) => {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("");
      }

      return await response.json();
    },
    mutationKey: ["onboarding"],
  });

  const [active, setActive] = useState(0);
  const [selectedRole, setSelectedRole] =
    useState<ProfileCreateSchema["role"]>("USER");
  const accountRoles: {
    image: string;
    title: string;
    id: ProfileCreateSchema["role"];
  }[] = [
    {
      image:
        "https://res.cloudinary.com/dj753bxhx/image/upload/v1725142399/fdueqlbt04hl7khc1rji.svg",

      title: "Regular User",
      id: "USER",
    },
    {
      image:
        "https://res.cloudinary.com/dj753bxhx/image/upload/v1725142399/vqxl4rbkuwqhnkzhjaoo.svg",
      title: "Content Creator",
      id: "CREATOR",
    },
  ];

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const submit = async (data: ProfileCreateSchema) => {
    mutate(data);
  };

  return (
    <>
      <Stepper
        active={active}
        onStepClick={setActive}
        completedIcon={
          <IconCircleCheck style={{ width: rem(18), height: rem(18) }} />
        }
      >
        <Stepper.Step
          icon={<IconUserCheck style={{ width: rem(18), height: rem(18) }} />}
          label="Accont setup"
          description="Complete Account Setup"
          className="space-y-5 gap-6 px-3"
        >
          <Form {...forms}>
            <form onSubmit={forms.handleSubmit(submit)}>
              <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
                <FormItem>
                  <FormControl>
                    <FileDropzone
                      title="Upload Profile Picture"
                      className="col-span-2 border rounded border-dashed mb-5"
                      value=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <div className="grid gap-3 w-full">
                  <FormField
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TextInput
                            label="First Name"
                            {...field}
                            type="text"
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TextInput
                            label="Last Name"
                            {...field}
                            type="text"
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <Title fz="h5">Role</Title>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-3 items-center justify-center mx-auto">
                  <FormField
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <AccountTypeCard
                            key={accountRoles[0].id}
                            image={accountRoles[0].image}
                            title={accountRoles[0].title}
                            onSelect={setSelectedRole}
                            id={selectedRole}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <AccountTypeCard
                            key={accountRoles[1].id}
                            image={accountRoles[1].image}
                            title={accountRoles[1].title}
                            onSelect={setSelectedRole}
                            id={selectedRole}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </Stepper.Step>

        {/* <Stepper.Step
          icon={<IconMailOpened style={{ width: rem(18), height: rem(18) }} />}
          label="Email Verification"
          description="A 6 digit OTP will be sent to your email address"
        >
          <div className="flex justify-center ">

          </div>
        </Stepper.Step> */}
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>
      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep} loading={isPending} disabled={isPending}>
          Next step
        </Button>
      </Group>
    </>
  );
}
