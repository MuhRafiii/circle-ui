import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LikeState {
  [threadId: number]: boolean;
}

const initialState: LikeState = {};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state[id] = !state[id];
    },
    setLike: (
      state,
      action: PayloadAction<{ thread_id: number; liked: boolean }>
    ) => {
      const { thread_id, liked } = action.payload;
      state[thread_id] = liked;
    },
  },
});

export const { toggleLike, setLike } = likeSlice.actions;
export default likeSlice.reducer;
