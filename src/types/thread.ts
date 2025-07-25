import type { User } from "./user";

export type Thread = {
  id: number;
  content: string;
  image?: string;
  user: User;
  created_at: string;
  likes: number;
  replies: number;
  isLiked: boolean;
};

export interface ThreadCard {
  thread: Thread;
  onLike: (id: number, liked: boolean) => void;
  onClick?: (id: number) => void;
}
