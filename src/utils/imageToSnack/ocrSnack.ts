import { Rectangle } from "tesseract.js";
import { SnackText } from "../interface/SnackText";
import { ocr } from "./ocr";

export const ocrSnack = async (imgUrl: string, rectangle: Rectangle): Promise<SnackText> => {
    const text = await ocr(imgUrl, rectangle);
    const dateText = text.split("\n")[0];
    const snackText = text.split("\n").slice(1).join('\n');

    return {
        dateText,
        snackText,
        rectangle
    };
}