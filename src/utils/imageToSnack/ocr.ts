import { createWorker, Rectangle } from "tesseract.js";

const worker = createWorker()
let workerInitiated = false;

export const ocr = async (imgUrl: string, rectangle: Rectangle): Promise<string> => {
    if (!workerInitiated){
        await worker.load();
        await worker.loadLanguage("kor");
        await worker.initialize("kor")
    }

    const { data: { text }} = await worker.recognize(imgUrl, { rectangles: [rectangle] });

    return text
}