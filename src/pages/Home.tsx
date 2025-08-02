import { ProfileCard } from "@/components/ProfileCard";
import { Sidebar } from "@/components/Sidebar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSocket } from "@/hooks/useSocket";
import { api } from "@/services/api";
import type { RootState } from "@/store";
import { setLike, toggleLike } from "@/store/likeSlice";
import type { Thread } from "@/types/thread";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ThreadCard } from "../components/Thread";
import "../index.css";

export function Home() {
  const user = useSelector((state: RootState) => state.user);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const socket = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingPages = useRef<Set<number>>(new Set());
  const lastThreadRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchThreads = async () => {
      if (loadingPages.current.has(page)) return; // ✅ mencegah duplikasi fetch
      loadingPages.current.add(page);

      try {
        setLoadingPage(true);

        await new Promise((res) => setTimeout(res, 1000));

        const res = await api.get(`/thread?page=${page}&limit=10`);
        const newThreads: Thread[] = res.data.data.threads;
        setThreads((prev) => [...prev, ...newThreads]);

        if (newThreads.length < 10) {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Gagal fetch data", err);
      } finally {
        setTimeout(() => {
          setLoadingPage(false);
        }, 200);
      }
    };

    if (hasMore) {
      fetchThreads();
    }
  }, [page]);

  useEffect(() => {
    if (!socket) return;

    const handleNewThread = ({
      tweet: newThread,
      userId,
    }: {
      tweet: Thread;
      userId: number;
    }) => {
      setThreads((prev) => [newThread, ...prev]);

      if (userId !== user?.id) {
        toast.info(`🆕 ${newThread.user.name} just posted a new thread!`);
      } else {
        toast.success("🎉 Thread berhasil diposting!");
      }
    };

    socket.on("new-thread", handleNewThread);

    return () => {
      socket.off("new-thread", handleNewThread);
    };
  }, [socket, user]);

  const handleLike = async (threadId: number, isLiked: boolean) => {
    const prevThreads = [...threads];

    // Optimistic update (ubah Redux duluan)
    dispatch(setLike({ thread_id: threadId, liked: !isLiked }));

    setThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === threadId) {
          const isLiked = !thread.isLiked;
          const likes = thread.likes + (isLiked ? 1 : -1);
          return { ...thread, isLiked, likes };
        }
        return thread;
      })
    );

    try {
      const res = await api.post(`/thread/${threadId}/like`);
      const liked = res.data.data.isLiked;
      if (liked !== !isLiked) {
        dispatch(setLike({ thread_id: threadId, liked }));
      }
      dispatch(setLike({ thread_id: threadId, liked }));
    } catch (err) {
      console.error("Gagal like thread", err);
      // Rollback Redux
      dispatch(toggleLike(threadId));
      // Rollback UI
      setThreads(prevThreads);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }

      const res = await api.post("/thread/upload", formData);
      setContent("");
      setPreview(null);
      console.log(res.data);
    } catch (err) {
      console.error("Gagal mengupload thread", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-2/9">
        <Sidebar />
      </div>
      <div className="w-1/2 overflow-y-auto hide-scrollbar">
        <h1 className="text-2xl text-start font-bold p-4 pt-6">Home</h1>
        <div className="flex items-center gap-4 p-4">
          <Avatar>
            <AvatarImage src={user?.avatar} />
          </Avatar>
          <form
            onSubmit={handleSubmit}
            className="w-full flex items-center gap-2"
          >
            <input
              type="textarea"
              placeholder="What is happening?!"
              className="w-full border-none bg-none p-2 focus:ring rounded-md text-sm"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Dialog>
              <DialogTrigger>
                <img
                  className="w-6 h-5 cursor-pointer hover:scale-110"
                  src="data:image/png;base64,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"
                  alt="external-add-image-multimedia-tanah-basah-basic-outline-tanah-basah"
                />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="hidden">
                    Create a new thread
                  </DialogTitle>
                </DialogHeader>
                <div className="p-2 pt-6">
                  <div className="flex items-center gap-4 border-b pb-8 mb-4">
                    <Avatar>
                      <AvatarImage src={user?.avatar} />
                    </Avatar>
                    <textarea
                      id="content"
                      placeholder="What is happening?!"
                      className="w-full outline-none text-sm focus:ring rounded-md p-2"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>

                  {preview && (
                    <div className="w-1/2 mx-auto flex justify-center mt-2 relative bg-gray-100 dark:bg-zinc-900 p-4 rounded-md">
                      <img src={preview} alt="Preview" className="w-full" />
                      <button
                        type="button"
                        onClick={() => setPreview(null)}
                        className="absolute top-1 right-1 text-2xl text-zinc-900 bg-opacity-50 dark:text-white rounded-full w-6 h-6 flex items-center justify-center hover:scale-110 cursor-pointer"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="">
                      <label htmlFor="image">
                        <img
                          className="w-5 h-5 cursor-pointer hover:scale-110"
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAHlUlEQVR4nO1dS4wURRj+mf+fXRWVqBcJuMtWzQiugkYunnzg66ImHnwmEE2MB2VBDcbjJpoI6EG5mOAFE2ICywUNYaeq16zhgKAoGAQ1PmIMqCiLCKI8VMzfM5BlM9XV04/p7pn6krrsznRV/V/1/6q/agAcHBwcHBwcHBwcHBwcOgMDY+UFQtNzQtOI1LhHapoQik5LTWfb2YSig1LhqsER6Ik6F/6u1Lhaavopieelhrmb4TKp6AWhcF+7BS1tTeGqqPPi7yb5vMRx2zhQRdHzUtORzAWtzW9C1Pn5qz7B5yWKOaM9c4XG3VkLWKZIgOmZyUoy0sDwAaHoeNbClWGawpUdRYDUpcVC0ZkirHwZ02jmjoDGyrcKXyjcz5MXChcNeD3XLlAwHQoImScChO6pCk3HLK/7x0LjndAhkHkhgL2dIIPLfn5F0TNwFqZBgTA4yc/Pg8ozouFqmjqfkB7eDgWEbObnxzf6q5IPsgx+vh/hFlT4Jj8/iTcB2rX6fbUT9/lboVcoWiY07hCa/qw33CE9GuL/QbcTYE4v4M64Or86BrMa+aLmk9G4mz8DxVJBkeOOpok1M9O4KM6zK1uhN0j4k0lI603wjbDvLsd/E1IxwpzVNAh/f+xnK1rWwgSXQgYwjadtAxCKNqZl6aXGneFXF36UzIwKRoBJRSQRbIkWckkcAEJ3EkATzQXSU437bOEICCEkTaeaETA4DpfGJUA6FZTtKyg9Gsq7Ec58QyZNAiocgIXY0OHPZLUPa9iSXNkxRqg6BrMCk3wpB2KtxAmZbMq3wwsY9DOStJRdTTbM9Ybb+W+5rEDoKjes2+EIyBiOgIzhCMgYjoCM4QjIuHbUEZBx7WgcAuRo+WbespQa10iNa6XCN9i3n1Mr3wgdgtRTFS0TMAwlqcpP26qkhcJvpS4/tXAXlKHASF1DtNJBVfdc10qGUzZSDUmktqHbCZBeaQlXM7QifHmeBPpjwMO7oIDInID+cbioruNbF7y8kIRTQpUehYIhUwL4fIBU+Hlc4cvz3gP9x6dsoEDIjICwKkco/ExofFUqelZqfC3cgQ58BQqC7AiwtxPs5TQr3OK/C8NW5yQS1sIIIOQcOSUAvxReeX7gc2t4Bxvf4LeHNs/eDhdDjpFHAt4JexhDqvJCqemQRYV9KDyYkcRc5nlwlb8PrWiLVPRDQ4UeEQq/E5o2CV1+cub7cElRCTghVPmJaIc+8HvLG7WnbxRmRp0DC5X3cYWmk9Z5KPrddwRCqr9cEOBHvaPl66P20TcKM201okxSlIBN1nor9ai7tTfZ3x71oC+qfKLKInQHUVROEIQHM1jdWPo6xGor9DNV+Qap6OcIarRBOv3KtiqKfOLKw9qBVPSX0LQ8sY7gXJkKX28QtDK5nBHvDVdtQT9GFf6k9o/Q9FKr8klMKKYOKmM9g5AGRgCFwrctK/Ok1KWHTY/o2wJXJH1lgtC0vplHlhkBiXVgAAdjFqH8y8Hd1O81UiPbLNH2uxVNt/DGCRtoLjQWmpSdBPx0zgfQ3xUEMHjvwBd0oGDwZTiHYSixOxkofA4OA45i2c5AC0W/TbYLHU0AQyh8UCr620LCOj5GKxW+aVnFK8CCqqJbpaJfwtqFjieAwalq2wFxofELC0lrICRYzXAOy66SaH1XEBA2ag5QG++1mldq2JJ1UfrrSAIYVa9XCI3ftCYM3MbChIiob6+2fttX1P5yTQCjfxyuDntHEbuis2twJcRESLvQHQSci5oDXc1GZUKYVELSdqF7CFDmnThOc1dV+aak+23FLnQsAYP+gQkaC1j5pwdqeHeaYwhjFzqTgGE/0BoJDLS80pJ2DMVmFzqSAFmvrAvS+y+2czxsF7qGAKlpRaDeVfhWu8fUGFfnEyBrpUeCckJRAq3CyCfNg9phwJdBBW8lxgu04qCyFS43eGGnEutEKDrcvJP06zmFV54vFR01r3zcx7l/yAh8G6ThjTxciMs6giBrcI1QdCBA7RxIMtCKAnZ3DbLZnf51NRpXQ0ro4x2toOymoqN8kRRkDKHwdYMK2pD6fXFJXNiU10ArLKTCrw1jXJasHjYII/GS8mF7oCW80uOQA1QU3mMcZ4wSnaaQGvcafO9PkryoVVoCrTA7Wm3BWZgmNe4yOQbtvbS1ycZ4KoGWDr+jlTaC7rrjO/YS75B9fuPNWZyUshQv2SB06bH6hrlxUptYPUEO4BcVGxJxvGGf2iXlXIQVsEInopIgFC4KLlXPLtCaCp6jaSH6zaOhdC/vDtiQaKyKpa3YhAG+kzTHgdYFOt+joaCSFa4ZYhmlOg6/0NVS088Gu6Lxobilg0LRwalFUFmAPT2TwZ001uP9tZ55bRlQReH94X49A7/iI0k8AT5LNlk35jXQWqBgOguS4ww/yDL4+VOEf2aghve1daBF+QkTmXKry6C0GLKA/ybYfk2jg5vQdKztK79ZNpCNT9bCkG1vuCs3p/vrP21Cy01p605qggtzPRpK3duJGqz51cXWGs0iNtzLEW5hfgmKjwY13oqNjSq2Cfu5YMq8NcY4Ub9AhDb4wWfSiTUHBwcHBwcHBwcHBwcHyAz/A3RTY7/+/eucAAAAAElFTkSuQmCC"
                          alt="external-add-image-multimedia-tanah-basah-basic-outline-tanah-basah"
                        />
                      </label>
                      <Input
                        id="image"
                        type="file"
                        hidden
                        onChange={(e) => {
                          setImage(e.target.files![0]);
                          setPreview(URL.createObjectURL(e.target.files![0]));
                        }}
                      />
                    </div>
                    <DialogFooter>
                      <DialogClose>
                        <Button
                          className="bg-green-500 hover:bg-green-600 rounded-full dark:text-white"
                          size="sm"
                        >
                          Done
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              className="bg-green-500 hover:bg-green-600 rounded-full dark:text-white"
              size="sm"
              type="submit"
            >
              {loading ? "Loading..." : "Post"}
            </Button>
          </form>
        </div>
        {threads.map((thread, i) => {
          const isLast = threads.length === i + 1;
          return (
            <div key={thread.id} ref={isLast ? lastThreadRef : null}>
              <ThreadCard
                thread={thread}
                onLike={handleLike}
                onClick={() => navigate(`/thread/${thread.id}`)}
              />
            </div>
          );
        })}
        {loadingPage && (
          <div className="text-center py-4 text-sm text-gray-500">
            Loading more...
          </div>
        )}
      </div>
      <div className="w-1/3 overflow-y-auto hide-scrollbar">
        <ProfileCard />
      </div>
    </div>
  );
}
