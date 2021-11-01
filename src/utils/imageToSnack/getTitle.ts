import { ocr } from "./ocr";

export const getTitle = async (imgUrl: string): Promise<string> => {
    const title = (await ocr(imgUrl, {
        top: 0,
        left: 0,
        width: 600,
        height: 170
    })).split('\n')[0]
        .replace(" ", "");

    return title;
}