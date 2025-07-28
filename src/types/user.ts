export type UserState = {
  id: number;
  username: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  following: number;
  followers: number;
  token: string;
} | null;
