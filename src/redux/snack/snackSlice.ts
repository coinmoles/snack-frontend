import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetSingleSnackPayload, initialState } from "./utils";
import { SnackData } from "../../utils/interface/SnackData";

export const snackSlice = createSlice({
    name: 'snack',
    initialState,
    reducers: {
        setSingleSnack: (state, action: PayloadAction<SetSingleSnackPayload>) => {
            state.snackData[action.payload.index].snack = action.payload.snack;
        },
        initSnack: (state, action: PayloadAction<SnackData[]>) => {
            state.snackData = action.payload;
        }
    }
})

export const { setSingleSnack, initSnack } = snackSlice.actions;

export default snackSlice.reducer