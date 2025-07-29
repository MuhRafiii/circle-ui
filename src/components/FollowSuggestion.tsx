import { api } from "@/services/api";
import type { RootState } from "@/store";
import { followUser } from "@/store/userSlice";
import type { SearchUser } from "@/types/user";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardTitle } from "./ui/card";

export function FollowSuggestion() {
  const [users, setUsers] = useState<SearchUser[]>([]);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/user/suggestions");
      setUsers(res.data.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFollow = async (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, is_following: true } : user
      )
    );

    try {
      await api.post("/following/follows", {
        followed_user_id: Number(userId),
      });
      dispatch(
        followUser({
          following: user!.following + 1,
          followers: user!.followers,
        })
      );
    } catch (err) {
      console.error("Failed to follow", err);

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, is_following: false } : user
        )
      );
      dispatch(
        followUser({
          following: user!.following - 1,
          followers: user!.followers,
        })
      );
    }
  };

  const handleUnfollow = async (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, is_following: false } : user
      )
    );

    try {
      await api.delete("/following/follows", {
        data: { followed_id: Number(userId) },
      });
      dispatch(
        followUser({
          following: user!.following - 1,
          followers: user!.followers,
        })
      );
    } catch (err) {
      console.error("Failed to unfollow", err);

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, is_following: true } : user
        )
      );
      dispatch(
        followUser({
          following: user!.following + 1,
          followers: user!.followers,
        })
      );
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="space-y-4">
        <CardTitle>Suggested for you</CardTitle>
        <div className="">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex gap-3 items-center justify-between mb-3"
            >
              <div className="flex gap-3 items-center">
                <Avatar>
                  <AvatarImage src={user.avatar} />
                </Avatar>
                <div className="text-start">
                  <div className="text-sm font-semibold">{user.name}</div>
                  <div className="text-sm text-gray-400">@{user.username}</div>
                </div>
              </div>
              {user.is_following ? (
                <button
                  onClick={() => handleUnfollow(user.id)}
                  className="text-xs font-semibold border border-zinc-900 dark:border-slate-200 text-slate-200 hover:text-white hover:dark:border-white opacity-50 cursor-pointer rounded-full px-3 py-1"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => handleFollow(user.id)}
                  className="text-xs font-semibold border border-zinc-900 dark:border-slate-300 text-slate-300 hover:text-white hover:dark:border-white cursor-pointer rounded-full px-3 py-1"
                >
                  Follow
                </button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
