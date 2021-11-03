import { SnackData } from "../../utils/interface/SnackData";

export interface LoadingState {
    current: "NoImage" | "ImageExist" | "ImageSectionSelected" | 
        "OCRLoading" | "OCRComplete" | "PostLoading" | "PostComplete"
}

export const initialState: LoadingState = {
    current: "NoImage"
}