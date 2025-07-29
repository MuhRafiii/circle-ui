import { FollowList } from "@/components/FollowList";
import { ProfileCard } from "@/components/ProfileCard";
import { Sidebar } from "@/components/Sidebar";

export default function FollowsPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-2/9">
        <Sidebar />
      </div>
      <div className="w-1/2 overflow-y-auto hide-scrollbar">
        <FollowList />
      </div>
      <div className="w-1/3 overflow-y-auto hide-scrollbar">
        <ProfileCard />
      </div>
    </div>
  );
}
