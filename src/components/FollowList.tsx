import { api } from "@/services/api";
import type { RootState } from "@/store";
import { followUser } from "@/store/userSlice";
import type { Follows } from "@/types/following";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FollowTabs } from "./FollowTabs";

export function FollowList() {
  const [tab, setTab] = useState<"followers" | "following">("followers");
  const [followers, setFollowers] = useState<Follows[]>([]);
  const [following, setFollowing] = useState<Follows[]>([]);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    fetchUsers(tab);
  }, [tab]);

  const fetchUsers = async (type: "followers" | "following") => {
    try {
      const res = await api.get(`/following/follows?type=${type}`);

      if (type === "following") {
        setFollowing(res.data.data.following);
      } else {
        setFollowers(res.data.data.followers);
      }
    } catch (err) {
      console.error("Failed to fetch", err);
    }
  };

  const handleFollow = async (userId: string) => {
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
      fetchUsers(tab);
    } catch (err) {
      console.error("Failed to follow", err);
    }
  };

  const handleUnfollow = async (userId: string) => {
    setFollowing((prev) =>
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
      // fetchUsers(tab);
    } catch (err) {
      console.error("Failed to unfollow", err);

      setFollowing((prev) =>
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
    <div className="w-full h-full">
      <div className="text-start text-2xl font-semibold p-4 pb-1">Follows</div>
      <FollowTabs active={tab} onChange={setTab} />

      <div className="p-4 space-y-4">
        {tab === "followers"
          ? followers.map((follower) => (
              <div
                key={follower.id}
                className="h-10 flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={follower.avatar}
                    alt={follower.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="text-start text-xs">
                    <p className="font-semibold">{follower.name}</p>
                    <p className="text-zinc-400">@{follower.username}</p>
                    <p>{follower.bio}</p>
                  </div>
                </div>
                {follower.is_following ? (
                  <button
                    onClick={() => handleUnfollow(follower.id)}
                    className="text-xs font-semibold border border-zinc-900 dark:border-slate-200 text-slate-200 hover:text-white hover:dark:border-white opacity-50 cursor-pointer rounded-full px-3 py-1"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollow(follower.id)}
                    className="text-xs font-semibold border border-zinc-900 dark:border-slate-300 text-slate-300 hover:text-white hover:dark:border-white cursor-pointer rounded-full px-3 py-1"
                  >
                    Follow
                  </button>
                )}
              </div>
            ))
          : following.map((f) => (
              <div
                key={f.id}
                className="h-10 flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={f.avatar}
                    alt={f.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="text-start text-xs">
                    <p className="font-semibold">{f.name}</p>
                    <p className="text-zinc-400">@{f.username}</p>
                    <p>{f.bio}</p>
                  </div>
                </div>
                {f.is_following ? (
                  <button
                    onClick={() => handleUnfollow(f.id)}
                    className="text-xs font-semibold border border-zinc-900 dark:border-slate-200 text-slate-200 hover:text-white hover:dark:border-white opacity-50 cursor-pointer rounded-full px-3 py-1"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollow(f.id)}
                    className="text-xs font-semibold border border-zinc-900 dark:border-slate-300 text-slate-300 hover:text-white hover:dark:border-white cursor-pointer rounded-full px-3 py-1"
                  >
                    Follow
                  </button>
                )}
              </div>
            ))}
      </div>
    </div>
  );
}
