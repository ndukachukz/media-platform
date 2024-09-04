import { Profile, User } from "@prisma/client";
import { z } from "zod";

export enum UserRoles {
  CREATOR = "Creator",
  USER = "User",
  ADMIN = "Admin",
}

export const profileCreateSchema = z.object({
  email_or_phone: z.string().min(1),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  image: z.string().optional(),
  bio: z.string().optional(),
});

export type ProfileCreateSchemaType = z.infer<typeof profileCreateSchema>;

export interface IUser extends User {}

export interface IProfile extends Profile {}
