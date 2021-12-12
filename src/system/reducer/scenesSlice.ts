import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ScenesState {
  activeScene: string;
}

export const initialState: ScenesState = {
  activeScene: "",
};

export const scenesSlice = createSlice({
  name: "scenes",
  initialState,
  reducers: {
    setActiveScene: (state, action: PayloadAction<string>) => {
      state.activeScene = action.payload;
    },
  },
});

export const { setActiveScene } = scenesSlice.actions;
export default scenesSlice.reducer;
