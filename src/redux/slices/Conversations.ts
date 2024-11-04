import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConversationsType } from "../../lib/types/Conversation";


const initialState: { data: ConversationsType[] } = {
    data: []
}

export const conversationSlice = createSlice({
    name: "conversations",
    initialState,
    reducers: {
        setConversations(state, action: PayloadAction<ConversationsType[]>) {
            state.data = action.payload
        },
        addConversation(state, action: PayloadAction<ConversationsType>) {
            state.data.unshift(action.payload)
        }
    }
})

export const { setConversations, addConversation } = conversationSlice.actions

export default conversationSlice.reducer