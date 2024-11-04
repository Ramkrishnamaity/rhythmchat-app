import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConversationProfileType, ConversationType } from "../../lib/types/Conversation";

interface SliceType {
    _id: string | null
    profile: ConversationProfileType | null
    data: ConversationType | null
    isProfileChange: boolean
}

const initialState: SliceType = {
    _id: null,
    profile: null,
    data: null,
    isProfileChange: false
}

export const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        setConversationProfile(state, action: PayloadAction<ConversationProfileType>) {
            state.profile = action.payload
        },
        setConversationData(state, action: PayloadAction<ConversationType>) {
            state.data = action.payload
        },
        setConversationId(state, action: PayloadAction<string>) {
            state._id = action.payload
        },
        setProfileChange(state, action: PayloadAction<boolean>) {
            state.isProfileChange = action.payload
        },
        removeConversationId(state) {
            state._id = null
        }
    }
})

export const {setConversationData, setConversationProfile, setConversationId, removeConversationId, setProfileChange} = conversationSlice.actions

export default conversationSlice.reducer