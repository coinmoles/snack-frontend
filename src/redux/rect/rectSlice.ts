import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./utils";

export const rectSlice = createSlice({
    name: 'rect',
    initialState,
    reducers: {
        setRectRows: (state, action: PayloadAction<number[]>) => {
            state.rows = action.payload;
        },
        setRectCols: (state, action: PayloadAction<number[]>) => {
            state.cols = action.payload;
        }
    }
})

export const { setRectRows, setRectCols } = rectSlice.actions;

export default rectSlice.reducer;