import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./utils";

export const urlSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setImageUrl: (state, action: PayloadAction<string>) => {
            state.imageUrl = action.payload;
        }
    }
})

export const { setImageUrl } = urlSlice.actions;

export default urlSlice.reducer