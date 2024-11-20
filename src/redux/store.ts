import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user";
import internetSlice from "./slices/InternetStatus";
import conversationsSlice from "./slices/Conversations";
import conversationSlice from "./slices/Conversation";
import roomSlice from "./slices/Room";

export const store = configureStore({
  reducer: {
    user: userSlice,
    internet: internetSlice,
    room: roomSlice,
    conversations: conversationsSlice,
    conversation: conversationSlice
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch