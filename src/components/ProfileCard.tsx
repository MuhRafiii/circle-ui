import { EditProfile } from "@/pages/EditProfile";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Card, CardContent } from "./ui/card";

export function ProfileCard() {
  const user = useSelector((state: RootState) => state.user);
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
                <span className="text-white">
                  <strong>0 </strong>
                </span>
                Following
              </div>
              <div className="text-gray-400">
                <span className="text-white">
                  <strong>0 </strong>
                </span>
                Followers
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
