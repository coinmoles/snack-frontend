import { configureStore } from "@reduxjs/toolkit";
import urlReducer from "./url/urlSlice";

export const store = configureStore({
    reducer: {
        url: urlReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;