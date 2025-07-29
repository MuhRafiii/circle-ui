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
  following: number;
  followers: number;
  token: string;
} | null;

export type SearchUser = {
  id: string;
  username: string;
  name: string;
  bio: string;
  avatar: string;
  followers: string;
  is_following: Boolean;
};

export type SearchCard = {
  user: SearchUser;
  handleFollow: (userId: string) => void;
  handleUnfollow: (userId: string) => void;
};
