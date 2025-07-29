import { ProfileCard } from "@/components/ProfileCard";
import { SearchList } from "@/components/SearchList";
import { Sidebar } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api";
import type { RootState } from "@/store";
import { followUser } from "@/store/userSlice";
import type { SearchUser } from "@/types/user";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Search() {
  const [users, setUsers] = useState<SearchUser[]>([]);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const fetchUsers = async () => {
    try {
      const res = await api.get(`/user/search?keyword=${input}`);
      setUsers(res.data.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const result = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(result);
  }, [input]);

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
      fetchUsers();
    } catch (err) {
      console.error("Failed to follow", err);
    }
  };

  const handleUnfollow = async (userId: string) => {
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
      fetchUsers();
    } catch (err) {
      console.error("Failed to unfollow", err);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-2/9">
        <Sidebar />
      </div>
      <div className="w-1/2 overflow-y-auto hide-scrollbar p-4 space-y-3">
        <div className="relative w-full mb-6">
          <img
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 mr-3 opacity-50"
            src="data:image/png;base64,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"
            alt="external-finding-the-suitable-candidate-for-perfect-role-classic-light-tal-revivo"
          />
          <Input
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-full"
          />
        </div>
        {users.length === 0 && input.trim() !== "" && (
          <div className="h-screen flex items-center">
            <div className="w-1/2 mx-auto text-center">
              <p className="text-lg font-semibold">No results for "{input}"</p>
              <p className="text-xs text-gray-400">
                Try searching for something else or check the spelling of what
                you typed.
              </p>
            </div>
          </div>
        )}
        {users.map((user) => (
          <SearchList
            key={Number(user.id)}
            user={user}
            handleFollow={handleFollow}
            handleUnfollow={handleUnfollow}
          />
        ))}
      </div>
      <div className="w-1/3 overflow-y-auto hide-scrollbar">
        <ProfileCard />
      </div>
    </div>
  );
}
