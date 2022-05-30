/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface CommentState {
  value: string;
}

// Define the initial state using that type
const initialState: CommentState = {
  value: '',
}

export const CommentSlice = createSlice({
  name: 'comment',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setComment: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const { setComment } = CommentSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default CommentSlice.reducer
