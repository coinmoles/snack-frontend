import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./utils";

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        resetLoading: state => {
            state.current = "NoImage";
        },
        setImageLoading: state => {
            state.current = "ImageExist";
        },
        setSectionLoading: state => {
            state.current = "ImageSectionSelected";
        },
        startOCRLoading: state => {
            state.current = "OCRLoading";
        },
        finishOCRLoading: state => {
            state.current = "OCRComplete";
        },
        startPostLoading: state => {
            state.current = "PostLoading";
        },
        finishPostLoading: state => {
            state.current = "PostComplete";
        }
    }
})

export const { resetLoading, setImageLoading, setSectionLoading,
    startOCRLoading, finishOCRLoading, startPostLoading, 
    finishPostLoading } = loadingSlice.actions;

export default loadingSlice.reducer;