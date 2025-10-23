import { configureStore } from "@reduxjs/toolkit";
import tryStore from "./tryStore/index";

export const store = configureStore({
  reducer: { tryStore },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
