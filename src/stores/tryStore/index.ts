import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TryState {
  name: string
  age: number
}

const initialState: TryState = {
  name: '',
  age: 0,
}

const tryStore = createSlice({
  name: 'tryStore',
  initialState,
  reducers: {
    setTryStore: (state, action: PayloadAction<TryState>) => {
      state.name = action.payload.name
      state.age = action.payload.age
    },
  },
})

export const { setTryStore } = tryStore.actions
export default tryStore.reducer