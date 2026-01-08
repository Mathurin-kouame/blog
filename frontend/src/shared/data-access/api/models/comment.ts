import { User } from "./user";

export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: User
}

export interface CommentDTO {
  body: string
}


