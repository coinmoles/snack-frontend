import { configureStore } from "@reduxjs/toolkit";
import urlReducer from "./url/urlSlice";
import rectReducer from "./rect/rectSlice";

export const store = configureStore({
    reducer: {
        url: urlReducer,
        rect: rectReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;