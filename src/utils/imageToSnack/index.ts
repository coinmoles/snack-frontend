import { SnackData } from "../interface/SnackData";
import { createRectangle } from "./createRectangle";
import { extractYearAndMonth } from "./extractYearAndMonth";
import { getSnackText } from "./getSnackText";
import { getTitle } from "./getTitle";
import { postSnackData } from "./postSnackData";

export const imageToSnack = async (imgUrl: string, rows: number[], cols: number[]): Promise<SnackData[]> => {
    const title = await getTitle(imgUrl);
    const { year, month } = extractYearAndMonth(title);
    const rectangles = createRectangle(rows, cols);
    const snackTexts = await getSnackText(imgUrl, rectangles);
    
    const snackDatas = await postSnackData(snackTexts, year, month); 
    
    return snackDatas
}