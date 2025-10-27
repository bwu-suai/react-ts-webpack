import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TryState {
  name: string;
  age: number;
  homeStr?: string;
}

const initialState: TryState = {
  name: "",
  age: 0,
  homeStr: "",
};

const tryStore = createSlice({
  name: "tryStore",
  initialState,
  reducers: {
    setTryStore: (_, action: PayloadAction<TryState>) => {
      return { ...action.payload };
    },
  },
});

export const { setTryStore } = tryStore.actions;
export default tryStore.reducer;
