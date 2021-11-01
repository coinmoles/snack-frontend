import { SnackData } from "../../utils/interface/SnackData";

export interface RectState {
    rows: number[],
    cols: number[]
}

export const initialState: RectState = {
    rows: [],
    cols: []
}