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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

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

  const handleDeletePhoto = async () => {
    try {
      const res = await api.delete("/user/delete-photo");
      setAvatar(res.data.data.avatar);
    } catch (error) {
      console.error("Failed to delete profile photo", error);
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
      } else if (avatar === "/default.png") {
        // Kirim sinyal ke backend untuk reset avatar
        formData.append("avatar", "");
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

            <div className="w-full max-w-md space-y-4 p-4 rounded-lg shadow-lg">
              <div className="text-center space-y-2">
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-20 h-20 rounded-full mx-auto border"
                />
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change Photo
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        Delete Photo
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete your profile photo?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeletePhoto}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
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
                  placeholder="Enter your username"
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
                <Button onClick={handleSave}>Save</Button>
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
