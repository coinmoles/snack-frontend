import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, setBaseRectPayload, setCardPayLoad } from "./utils";

export const rectSlice = createSlice({
    name: 'rect',
    initialState,
    reducers: {
        setBaseRect: (state, action: PayloadAction<setBaseRectPayload>) => {
            state.xStart = action.payload.xStart;
            state.xStop = action.payload.xStop;
            state.yStart = action.payload.yStart;
            state.yStop = action.payload.yStop;
        },
        setCards: (state, action: PayloadAction<setCardPayLoad>) => {
            state.xCard = action.payload.xCard;
            state.yCard = action.payload.yCard
        }
    }
})

export const { setBaseRect, setCards } = rectSlice.actions;

export default rectSlice.reducer;