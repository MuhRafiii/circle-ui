import type { UserState } from "@/types/user";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null as UserState | null,
  reducers: {
    setUser: (_, action: PayloadAction<UserState>) => action.payload,
    updateUser: (
      state,
      action: PayloadAction<{
        username: string;
        name: string;
        bio: string;
        avatar: string;
      }>
    ) => {
      if (state) {
        state.username = action.payload.username;
        state.name = action.payload.name;
        state.bio = action.payload.bio;
        state.avatar = action.payload.avatar;
        localStorage.setItem("user", JSON.stringify(state));
      }
    },
    followUser: (
      state,
      action: PayloadAction<{
        following: number;
      }>
    ) => {
      if (state) {
        state.following = action.payload.following;
        localStorage.setItem("user", JSON.stringify(state));
      }
    },
    clearUser: () => null,
  },
});

export const { setUser, updateUser, followUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
