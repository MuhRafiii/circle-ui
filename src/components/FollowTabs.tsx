import type { FollowsProps } from "@/types/following";

export function FollowTabs({ active, onChange }: FollowsProps) {
  return (
    <div className="flex border-b border-zinc-700">
      <button
        onClick={() => onChange("followers")}
        className={`flex-1 p-2 text-center ${
          active === "followers"
            ? "border-b-2 border-green-500 text-white"
            : "text-zinc-400"
        }`}
      >
        Followers
      </button>
      <button
        onClick={() => onChange("following")}
        className={`flex-1 p-2 text-center ${
          active === "following"
            ? "border-b-2 border-green-500 text-white"
            : "text-zinc-400"
        }`}
      >
        Following
      </button>
    </div>
  );
}
