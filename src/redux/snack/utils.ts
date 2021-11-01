import { SnackData } from "../../utils/interface/SnackData";

export interface SnackState {
    snackData: SnackData[]
}

export const initialState: SnackState = {
    snackData: []
}

export interface SetSingleSnackPayload {
    index: number,
    snack: string
}