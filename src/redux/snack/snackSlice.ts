import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetSingleSnackPayload, initialState } from "./utils";
import { SnackData } from "../../utils/interface/SnackData";

export const snackSlice = createSlice({
    name: 'snack',
    initialState,
    reducers: {
        setSingleSnack: (state, action: PayloadAction<string>) => {
            state.snackData[state.index].snack = action.payload;
        },
        initSnack: (state, action: PayloadAction<SnackData[]>) => {
            state.snackData = action.payload;
        },
        nextDay: (state) => {
            if (state.index < state.snackData.length - 1)
                state.index += 1;
        },
        prevDay: (state) => {
            if (state.index > 0)
                state.index -= 1;
        }
    }
})

export const { setSingleSnack, initSnack, nextDay, prevDay } = snackSlice.actions;

export default snackSlice.reducer