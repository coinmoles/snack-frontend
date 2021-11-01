import { SnackData } from "../../utils/interface/SnackData";

export interface SnackState {
    snackData: SnackData[]
    index: number;
}

export const initialState: SnackState = {
    snackData: [],
    index: 0
}

export interface SetSingleSnackPayload {
    snack: string
}