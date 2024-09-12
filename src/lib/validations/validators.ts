import { EMAIL_PHONE_REGEX } from "@/constants";
import { ValidationSchema } from "@/lib/validations/schema.validator";
import { IProfile, ProfileCreateSchema } from "@/types/user.type";
import { GenerateOTPSchema, RegisterFormSchema } from "./auth.schemas";
import { Payload as SendEmailPayload } from "../nodemailer";
import { Post } from "@prisma/client";
import { CreatePostFormSchema } from "./post.schemas";

function UserValidator(data: RegisterFormSchema): Array<string> {
  const userSchema = new ValidationSchema<RegisterFormSchema>([
    {
      field: "first_name",
      validations: [(value) => (value ? null : "First Name is required")],
    },
    {
      field: "last_name",
      validations: [(value) => (value ? null : "Last Name is required")],
    },
    {
      field: "password",
      validations: [(value) => (value ? null : "Password is required")],
    },
    {
      field: "email_or_phone",
      validations: [
        (value) => (value ? null : "Email or phone is required"),
        (value) => {
          if (EMAIL_PHONE_REGEX) {
            return null;
          }
          return "Invalid email or phone format";
        },
      ],
    },
  ]);

  const errors = userSchema.validate(data);
  return errors;
}

function ProfileValidator(data: ProfileCreateSchema): Array<string> {
  const profileSchema = new ValidationSchema<ProfileCreateSchema>([
    {
      field: "first_name",
      validations: [
        (value) => (value ? null : "First name is required"),
        (value) =>
          value.length <= 100
            ? null
            : "First name must be 100 characters or less",
      ],
    },
    {
      field: "last_name",
      validations: [
        (value) => (value ? null : "Last name is required"),
        (value) =>
          value.length <= 100
            ? null
            : "Last name must be 100 characters or less",
      ],
    },
    {
      field: "image",
      validations: [
        (value) => {
          if (!value) return null;
          try {
            new URL(value);
            return null;
          } catch {
            return "Image must be a valid URL";
          }
        },
      ],
    },
    {
      field: "bio",
      validations: [
        (value) => {
          if (!value) return null;
          return value.length <= 500
            ? null
            : "Bio must be 500 characters or less";
        },
      ],
    },
  ]);

  const errors = profileSchema.validate(data);
  return errors;
}

function SendEmailValidator(
  data: Omit<SendEmailPayload, "html" | "subject">
): Array<string> {
  const sendEmailSchema = new ValidationSchema<
    Omit<SendEmailPayload, "html" | "subject">
  >([
    {
      field: "recipient",
      validations: [(value) => (value ? null : "recipient is required")],
    },
  ]);

  const errors = sendEmailSchema.validate(data);
  return errors;
}

function GenerateOTPValidator(data: GenerateOTPSchema): Array<string> {
  const profileSchema = new ValidationSchema<GenerateOTPSchema>([
    {
      field: "recipient",
      validations: [(value) => (value ? null : "recipient is required")],
    },
    {
      field: "length",
      validations: [(value) => (value ? null : "length is required")],
    },
  ]);

  const errors = profileSchema.validate(data);
  return errors;
}

function CreatePostValidator(data: CreatePostFormSchema): Array<string> {
  const createPostSchema = new ValidationSchema<CreatePostFormSchema>([
    {
      field: "content",
      validations: [(value) => (value ? null : "content is required")],
    },
    {
      field: "title",
      validations: [(value) => (value ? null : "title is required")],
    },
    {
      field: "cover_image",
      validations: [(value) => (value ? null : "cover image is required")],
    },
    {
      field: "images",
      validations: [(value) => (value ? null : "images are required")],
    },
    {
      field: "tags",
      validations: [(value) => (value ? null : "tags are required")],
    },
    {
      field: "slug",
      validations: [(value) => (value ? null : "post slug is required")],
    },
  ]);

  const errors = createPostSchema.validate(data);
  return errors;
}

export {
  UserValidator,
  ProfileValidator,
  SendEmailValidator,
  GenerateOTPValidator,
  CreatePostValidator,
};
