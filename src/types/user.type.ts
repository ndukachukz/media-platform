import { Profile, User, UserRole } from "@prisma/client";
import { z } from "zod";

export const profileCreateSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  image: z.string().url(),
  bio: z.string(),
  role: z.nativeEnum(UserRole),
});

export type ProfileCreateSchema = z.infer<typeof profileCreateSchema>;

export interface IUser extends User {}

export interface IProfile extends Profile {}
