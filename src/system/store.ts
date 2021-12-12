import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./reducer/settingsSlice";
import scenesReducer from "./reducer/scenesSlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    scenes: scenesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;