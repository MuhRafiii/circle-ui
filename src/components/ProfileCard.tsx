import { useSocket } from "@/hooks/useSocket";
import type { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { EditProfile } from "./EditProfile";
import { Card, CardContent } from "./ui/card";

export function ProfileCard() {
  const user = useSelector((state: RootState) => state.user);
  const socket = useSocket();
  const [followers, setFollowers] = useState(user?.followers || 0);
  const [following, setFollowing] = useState(user?.following || 0);

  useEffect(() => {
    if (!socket) return;

    const handleNewFollower = ({
      followerId,
      followerName,
      followerUsername,
    }: {
      followerId: number;
      followerName: string;
      followerUsername: string;
    }) => {
      if (followerId !== user?.id) {
        setFollowers((prev) => prev + 1);
        toast.info(
          `${followerName} (@${followerUsername}) started following you.`
        );
      } else {
        setFollowing((prev) => prev + 1);
      }
    };

    socket.on("new-follower", handleNewFollower);

    return () => {
      socket.off("new-follower", handleNewFollower);
    };
  }, [socket, user]);

  useEffect(() => {
    if (!socket) return;

    const handleUnfollow = (followerId: number) => {
      if (followerId !== user?.id) {
        setFollowers((prev) => prev - 1);
      } else {
        setFollowing((prev) => prev - 1);
      }
    };

    socket.on("new-unfollower", handleUnfollow);

    return () => {
      socket.off("new-unfollower", handleUnfollow);
    };
  }, [socket, user]);

  return (
    <aside className="w-full min-h-screen flex flex-col justify-between p-4 space-y-4 border-l text-start">
      <div className="space-y-6">
        <Card className="mb-4">
          <CardContent className="space-y-4">
            <div className="font-semibold">My Profile</div>
            <img
              src="../public/background.jpeg"
              alt="background"
              className="w-full h-20 rounded-lg"
            />
            <div className="flex justify-between items-end -mt-11">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-15 h-15 rounded-full border-2 border-white dark:border-zinc-900 ml-5"
              />
              <EditProfile />
            </div>
            <div>
              <div className="text-xl font-semibold">{user?.name}</div>
              <div className="text-sm text-gray-400">@{user?.username}</div>
              <p>{user?.bio}</p>
            </div>
            <div className="flex gap-2 text-sm">
              <div className="text-gray-400">
                <span className="text-white font-bold mr-1">{following}</span>
                Following
              </div>
              <div className="text-gray-400">
                <span className="text-white font-bold mr-1">{followers}</span>
                Followers
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
