import type { UserState } from "@/types/user";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null as UserState | null,
  reducers: {
    setUser: (_, action: PayloadAction<UserState>) => action.payload,
    clearUser: () => null,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
