import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConversationProfileType, ConversationType, MessageConversationType } from "../../lib/types/Conversation";

interface SliceType {
    _id: string | null
    profile: ConversationProfileType | null
    data: ConversationType | null
    isProfileChange: boolean
    isFavorite: boolean
}

const initialState: SliceType = {
    _id: null,
    profile: null,
    data: null,
    isProfileChange: false,
    isFavorite: false
};

export const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        setConversationProfile(state, action: PayloadAction<ConversationProfileType>) {
            state.profile = action.payload;
        },
        setConversationType(state, action: PayloadAction<boolean>) {
            state.isFavorite = action.payload;
        },
        setConversationData(state, action: PayloadAction<ConversationType>) {
            state.data = action.payload
        },
        addConversationData(state, action: PayloadAction<MessageConversationType>) {
            if (state.data) {
                state.data.push(action.payload);
                if (state.data.length > 10) {
                    state.data.shift();
                }
            } else {
                state.data = [action.payload];
            }
        },
        setConversationId(state, action: PayloadAction<string>) {
            state._id = action.payload;
        },
        setProfileChange(state, action: PayloadAction<boolean>) {
            state.isProfileChange = action.payload;
        },
        removeConversationId(state) {
            state._id = null;
        }
    }
});

export const { setConversationData, setConversationType, addConversationData, setConversationProfile, setConversationId, removeConversationId, setProfileChange } = conversationSlice.actions;

export default conversationSlice.reducer;