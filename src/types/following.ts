export type Follower = {
  id: string;
  username: string;
  name: string;
  bio: string;
  avatar: string;
  is_following?: boolean;
};

export type Following = {
  id: string;
  username: string;
  name: string;
  bio: string;
  avatar: string;
};

export type FollowsProps = {
  active: "followers" | "following";
  onChange: (tab: "followers" | "following") => void;
};
