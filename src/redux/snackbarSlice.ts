import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { SnackBarMessage } from '../../types'

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
    snackbarEnque: (state, action: PayloadAction<SnackBarMessage>) => {
      const message: SnackBarMessage['message'] = action.payload.message
      const color: SnackBarMessage['color'] = action.payload.color
      const newMessage: SnackBarMessage = { message, color }
      // @ts-ignore
      state.snackbarQueue.push(newMessage)
    },
    snackbarDeque: (state) => {
      state.snackbarQueue.pop()
    },
  },
})

export const selectMessageQueue = (state: RootState): Array<SnackBarMessage> =>
  state.snackbar.snackbarQueue

export const { snackbarEnque, snackbarDeque } = snackbarSlice.actions

export default snackbarSlice.reducer
