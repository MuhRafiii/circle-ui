import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import type { ThreadCard } from "@/types/thread";
import { Heart, HeartIcon, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function ThreadDetailCard({ thread, onLike }: ThreadCard) {
  const date = new Date(thread.created_at);
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <Card className="rounded-none shadow-none border-t">
      <CardContent className="space-y-4">
        <div className="flex gap-3 items-center">
          <Link to="/">
            <div className="text-3xl">←</div>
          </Link>
          <div className="text-2xl font-semibold">Status</div>
        </div>
        <div className="flex gap-3 mb-2 items-center">
          <Avatar>
            <AvatarImage src={thread.user.profile_picture} />
          </Avatar>
          <div className="text-start">
            <div className="text-sm font-semibold">{thread.user.name}</div>
            <div className="text-sm text-gray-400">@{thread.user.username}</div>
          </div>
        </div>
        <div className="text-start space-y-2">
          <p className="text-sm text-justify mb-3">{thread.content}</p>
          {thread.image && (
            <img src={thread.image} className="rounded mb-3 w-60" />
          )}
        </div>

        <div className="text-sm text-start text-gray-400">
          {time} • {dateStr}
        </div>

        <div className="flex gap-6 text-sm items-center">
          <button
            className="flex items-center gap-1"
            onClick={() => onLike(thread.id, thread.isLiked)}
          >
            {thread.isLiked ? (
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            ) : (
              <HeartIcon className="w-4 h-4" />
            )}
            {thread.likes} Like
          </button>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {thread.replies} Replies
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
