import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user'
import internetSlice from './slices/InternetStatus'
import conversationsSlice from './slices/Conversations'
import conversationSlice from './slices/Conversation'
import socketSlice from './slices/Socket'

export const store = configureStore({
  reducer: {
    user: userSlice,
    internet: internetSlice,
    socket: socketSlice,
    conversations: conversationsSlice,
    conversation: conversationSlice
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch