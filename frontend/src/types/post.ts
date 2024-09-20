import { User } from "./user";

export interface Post {
  id: number;
  user: User;
  postDate?: Date;
  description?: string;
  photoURLs?: string[];
  videoURLs?: string[];
  comments?: Comment[];
}

export interface Comment {
  user: User;
  comment: string;
}

export interface Reaction {
  user: User;
  emoji: string;
  label?: string;
  color?: string;
}

export interface Share {
  user: User;
}