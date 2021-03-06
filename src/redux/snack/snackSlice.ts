import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SnackData } from "../../utils/interface/SnackData";
import { initialState } from "./utils";

export const snackSlice = createSlice({
    name: 'snack',
    initialState,
    reducers: {
        setSingleSnack: (state, action: PayloadAction<string>) => {
            state.snackData[state.index].snack = action.payload;
        },
        deleteSingleSnack: (state) => {
            state.snackData.splice(state.index, 1);
        },
        initSnack: (state, action: PayloadAction<SnackData[]>) => {
            state.snackData = action.payload;
            state.index = 0
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

export const { setSingleSnack,deleteSingleSnack, initSnack, nextDay, prevDay } = snackSlice.actions;

export default snackSlice.reducer