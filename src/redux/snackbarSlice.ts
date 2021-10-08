import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { SnackBarMessage } from '../../@types/app'

import type { RootState } from './store'

export interface SnackBarState {
  snackbarQueue: Array<SnackBarMessage>
}

const initialState: SnackBarState = {
  snackbarQueue: [],
}

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    enqueSnackbar: (state, action: PayloadAction<SnackBarMessage>) => {
      const message: SnackBarMessage['message'] = action.payload.message
      const color: SnackBarMessage['color'] = action.payload.color
      const newMessage: SnackBarMessage = { message, color }
      state.snackbarQueue.push(newMessage)
    },
    dequeSnackbar: (state) => {
      state.snackbarQueue.pop()
    },
  },
})

export const selectMessageQueue = (state: RootState): Array<SnackBarMessage> =>
  state.snackbar.snackbarQueue

export const { enqueSnackbar, dequeSnackbar } = snackbarSlice.actions

export default snackbarSlice.reducer
