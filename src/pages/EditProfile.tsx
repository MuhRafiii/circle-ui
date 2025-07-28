import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api";
import type { RootState } from "@/store";
import { updateUser } from "@/store/userSlice";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function EditProfile() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user?.username || "");
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const file = fileInputRef.current?.files?.[0];
      const formData = new FormData();
      formData.append("username", username);
      formData.append("name", name);
      formData.append("bio", bio);
      if (file) {
        formData.append("avatar", file);
      }

      await api.patch("/user", formData);
      dispatch(updateUser({ username, name, bio, avatar }));
      dialogCloseRef.current?.click();
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  return (
    <div className="">
      <Dialog>
        <DialogTrigger>
          <button className="text-xs font-semibold border border-zinc-900 dark:border-white hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-400 cursor-pointer rounded-full px-2.5 py-0.5">
            Edit Profile
          </button>
        </DialogTrigger>
        <DialogContent>
          <div className="w-full">
            <DialogHeader>
              <h2 className="text-2xl font-bold">Edit Profile</h2>
            </DialogHeader>

            <div className="w-full max-w-md space-y-2 p-4 rounded-lg shadow-lg">
              <div className="text-center">
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-20 h-20 rounded-full mx-auto border"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Change Photo
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </div>

              <div className="flex flex-col gap-1 items-start">
                <label className="text-sm font-medium">Username</label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div className="flex flex-col gap-1 items-start">
                <label className="text-sm font-medium">Name</label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div className="flex flex-col gap-1 items-start">
                <label className="text-sm font-medium">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself"
                  className="w-full border rounded p-2 text-sm"
                  rows={4}
                />
              </div>

              <DialogFooter>
                <DialogClose>
                  <Button ref={dialogCloseRef} variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button onClick={handleSave} className="mr-0">
                  Save
                </Button>
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
