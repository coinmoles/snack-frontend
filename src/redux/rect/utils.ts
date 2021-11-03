
export interface RectState {
    xStart: number, xStop: number, xCard: number,
    yStart: number, yStop: number, yCard: number
}

export const initialState: RectState = {
    xStart: 0, xStop: 0, xCard: 0,
    yStart: 0, yStop: 0, yCard: 0
}

export interface setBaseRectPayload {
    xStart: number, xStop: number,
    yStart: number, yStop: number
}

export interface setCardPayLoad {
    xCard: number,
    yCard: number
}