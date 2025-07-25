export type User = {
  id: number;
  username: string;
  name: string;
  profile_picture: string;
};

export type UserState = {
  id: number;
  username: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  token: string;
} | null;
