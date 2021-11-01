import { configureStore } from "@reduxjs/toolkit";
import urlReducer from "./url/urlSlice";
import rectReducer from "./rect/rectSlice";
import snackReducer from "./snack/snackSlice";

export const store = configureStore({
    reducer: {
        url: urlReducer,
        snack: snackReducer,
        rect: rectReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;