import { Rectangle } from "tesseract.js";
import { SnackText } from "../interface/SnackText";
import { ocrSnack } from "./ocrSnack";

export const getSnackText = async (imgUrl: string, rectangles: Rectangle[]): Promise<SnackText[]> =>  {
    const snackTexts: SnackText[] = []

    for (const rectangle of rectangles)
        snackTexts.push(await ocrSnack(imgUrl, rectangle));

    return snackTexts
}