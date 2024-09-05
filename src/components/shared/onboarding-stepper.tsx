"use client";
import { useState } from "react";
import {
  IconUserCheck,
  IconMailOpened,
  IconCircleCheck,
} from "@tabler/icons-react";
import { Card, Stepper, rem, Button, Group, Text } from "@mantine/core";
import FileDropzone from "./file-dropzone";
import AccountTypeCard from "./account-type-card";

export default function OnboardingStepper() {
  const [active, setActive] = useState(0);
  const [selectedRole, setSelectedRole] = useState<"User" | "Admin">("User");
  const accountRoles = [
    {
      image:
        "https://res.cloudinary.com/dj753bxhx/image/upload/v1725142399/fdueqlbt04hl7khc1rji.svg",

      title: "Regular User",
      id: "User",
    },
    {
      image:
        "https://res.cloudinary.com/dj753bxhx/image/upload/v1725142399/vqxl4rbkuwqhnkzhjaoo.svg",
      title: "Content Creator",
      id: "Admin",
    },
  ];

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

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
          className="space-y-5 gap-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3  gap-5">
            <FileDropzone
              title="Upload Profile Picture"
              className="col-span-2 border rounded border-dashed mb-5"
            />
            <div className="flex gap-x-5">
              <Text>First Name</Text>
              <Text>Last Name</Text>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-3 items-center justify-center mx-auto">
            {accountRoles.map((role) => (
              <AccountTypeCard
                key={role.id}
                image={role.image}
                title={role.title}
                onSelect={setSelectedRole}
                id={selectedRole}
              />
            ))}
          </div>
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
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
}
