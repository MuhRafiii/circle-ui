export type Follows = {
  id: string;
  username: string;
  name: string;
  bio: string;
  avatar: string;
  is_following: boolean;
};

export type FollowsProps = {
  active: "followers" | "following";
  onChange: (tab: "followers" | "following") => void;
};
