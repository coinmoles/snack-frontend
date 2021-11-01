import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./utils";

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        startSnackLoading: state => {
            state.snacks = "Loading";
        },
        finishSnackLoading: state => {
            state.snacks = "Done";
        },
        resetSnackLoading: state => {
            state.snacks = "None";
        },
        startPostLoading: state => {
            state.post = "Loading";
        },
        finishPostLoading: state => {
            state.post = "Done";
        },
        resetPostLoading: state => {
            state.post = "None";
        },
        startImageLoading: state => {
            state.image = "Done";
        },
        resetImageLoading: state => {
            state.image = "None";
        }
    }
})

export const { startSnackLoading, finishSnackLoading, resetSnackLoading, 
    startPostLoading, finishPostLoading, resetPostLoading, 
    startImageLoading, resetImageLoading } = loadingSlice.actions;

export default loadingSlice.reducer;