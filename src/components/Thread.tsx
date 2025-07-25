import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { formatCardDate } from "@/lib/utils";
import type { RootState } from "@/store";
import type { ThreadCard } from "@/types/thread";
import { Heart, HeartIcon, MessageCircle } from "lucide-react";
import { useSelector } from "react-redux";

export function ThreadCard({ thread, onLike, onClick }: ThreadCard) {
  const likesRedux = useSelector((state: RootState) => state.likes);
  const isLiked = likesRedux?.[thread.id] ?? thread.isLiked;

  return (
    <Card className="rounded-none shadow-none border-t">
      <CardContent className="">
        <div className="flex gap-4 mb-2" onClick={() => onClick?.(thread.id)}>
          <Avatar className="mt-2">
            <AvatarImage src={thread.user.profile_picture} />
          </Avatar>
          <div className="text-start space-y-2">
            <div className="flex gap-2 items-center">
              <div className="flex gap-1 items-start">
                <div className="text-sm font-semibold">{thread.user.name}</div>
                <div className="text-sm text-gray-400">
                  @{thread.user.username}
                </div>
              </div>
              <div className="text-sm text-gray-400">•</div>
              <div className="text-sm text-gray-400">
                {formatCardDate(thread.created_at)}
              </div>
            </div>
            <p className="text-sm text-justify mb-3">{thread.content}</p>
            {thread.image && (
              <img src={thread.image} className="rounded mb-3 w-60" />
            )}
          </div>
        </div>

        <div className="flex gap-6 text-sm items-center">
          <button
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => onLike(thread.id, isLiked)}
          >
            {isLiked ? (
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            ) : (
              <HeartIcon className="w-4 h-4" />
            )}
            {thread.likes} Like
          </button>
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => onClick?.(thread.id)}
          >
            <MessageCircle className="w-4 h-4" />
            {thread.replies} Replies
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
