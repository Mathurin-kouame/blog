import { z } from "zod";
import { LoginValidationSchema, RegisterValidationSchema, UpdateUserValidationSchema } from "../../zod-schema";

export interface User {
  bio: string;
  image: string;
  username: string;
  token: string;
  email: string;
  following: boolean
}

export interface Profile {
  bio: string;
  image: string;
  username: string;
  following: boolean
}

export type UserLoginDTO = z.infer<typeof LoginValidationSchema>
export type UserRegisterDTO = z.infer<typeof RegisterValidationSchema>
export type UpdateUserDTO = z.infer<typeof UpdateUserValidationSchema>
