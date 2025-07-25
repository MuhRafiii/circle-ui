import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { formatCardDate } from "@/lib/utils";
import type { ReplyCard } from "@/types/reply";

export function ReplyCard({ reply }: ReplyCard) {
  return (
    <Card className="rounded-none shadow-none border-t">
      <CardContent className="">
        <div className="flex gap-4">
          <Avatar className="mt-2">
            <AvatarImage src={reply.user.profile_picture} />
          </Avatar>
          <div className="text-start space-y-2">
            <div className="flex gap-2 items-center">
              <div className="flex gap-1 items-start">
                <div className="text-sm font-semibold">{reply.user.name}</div>
                <div className="text-sm text-gray-400">
                  @{reply.user.username}
                </div>
              </div>
              <div className="text-sm text-gray-400">•</div>
              <div className="text-sm text-gray-400">
                {formatCardDate(reply.created_at)}
              </div>
            </div>
            <p className="text-sm text-justify mb-3">{reply.content}</p>
            {reply.image && (
              <img src={reply.image} className="rounded mb-3 w-60" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
