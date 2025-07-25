import type { User } from "./user";

export type Reply = {
  id: number;
  content: string;
  image?: string;
  created_at: string;
  user: User;
};

export interface ReplyCard {
  reply: Reply;
}
