import { configureStore } from "@reduxjs/toolkit";
import urlReducer from "./url/urlSlice";
import rectReducer from "./rect/rectSlice";
import snackReducer from "./snack/snackSlice";
import loadingReducer from "./loading/loadingSlice";

export const store = configureStore({
    reducer: {
        url: urlReducer,
        snack: snackReducer,
        rect: rectReducer,
        loading: loadingReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;