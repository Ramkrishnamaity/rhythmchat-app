import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConversationsType, messageType } from "../../lib/types/Conversation";

const initialState: { data: ConversationsType[] } = {
    data: []
};

export const conversationSlice = createSlice({
    name: "conversations",
    initialState,
    reducers: {
        setConversations(state, action: PayloadAction<ConversationsType[]>) {
            state.data = action.payload;
        },
        addConversation(state, action: PayloadAction<ConversationsType>) {
            state.data.unshift(action.payload);
        },
        setMessageData(state, action: PayloadAction<messageType>) {
            let required = null;
            const data = state.data.reduce((accumulator: ConversationsType[], expense: ConversationsType) => {
                if(expense._id === action.payload.conversationId) {
                    required = {
                        ...expense,
                        messageData: action.payload
                    };
                } else {
                    accumulator.push(expense);
                }
                return accumulator;
            }, []);
            required && data.unshift(required);
            state.data = data;
        },
    }
});

export const { setConversations, addConversation, setMessageData } = conversationSlice.actions;

export default conversationSlice.reducer;