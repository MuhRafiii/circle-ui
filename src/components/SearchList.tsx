import type { SearchCard } from "@/types/user";

export function SearchList({ user, handleFollow, handleUnfollow }: SearchCard) {
  return (
    <div className="h-11 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="text-start text-xs">
          <p className="font-semibold">{user.name}</p>
          <p className="text-zinc-400">@{user.username}</p>
          <p>{user.bio}</p>
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
  );
}
