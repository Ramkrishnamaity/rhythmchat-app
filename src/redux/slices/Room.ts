import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type defaultScreenType = {
    name: string
    image: string
}
interface roomState {
    roomId: string | null;
    hostByUser: boolean
    defaultScreen: defaultScreenType | null
}


const initialState: roomState = {
    roomId: null,
    hostByUser: false,
    defaultScreen: null
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
        setDefaultScreen(state, action: PayloadAction<defaultScreenType>) {
            state.defaultScreen = action.payload;
        },
    }
});

export const { setRoom, setHostByUser, setDefaultScreen} = roomSlice.actions;

export default roomSlice.reducer;