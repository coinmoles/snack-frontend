import { SnackData } from "../../utils/interface/SnackData";

export interface LoadingState {
    snacks: "None" | "Loading" | "Done"
    post: "None" | "Loading" | "Done"
    image: "None" | "Loading" | "Done"
}

export const initialState: LoadingState = {
    snacks: "None",
    post: "None",
    image: "None"
}