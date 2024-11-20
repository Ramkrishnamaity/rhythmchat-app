import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface roomState {
    roomId: string | null;
    hostByUser: boolean
}


const initialState: roomState = {
    roomId: null,
    hostByUser: false
};

export const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        setRoom(state, action: PayloadAction<string>) {
            state.roomId = action.payload;
        },
        setHostByUser(state, action: PayloadAction<boolean>) {
            state.hostByUser = action.payload;
        },
    }
});

export const { setRoom, setHostByUser } = roomSlice.actions;

export default roomSlice.reducer;