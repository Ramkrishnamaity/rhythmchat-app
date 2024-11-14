import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {online: boolean} = {
    online: navigator.onLine
};

export const internetSlice = createSlice({
    name: "internet",
    initialState,
    reducers: {
        setStatus(state, action: PayloadAction<boolean>) {
            state.online = action.payload;
        }
    }
});

export const {setStatus} = internetSlice.actions;

export default internetSlice.reducer;