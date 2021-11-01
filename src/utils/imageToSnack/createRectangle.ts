import { Rectangle } from "tesseract.js" 

export const createRectangle = (rows: number[], cols: number[]) => {
    const rectangles: Rectangle[] = []

    for (let i = 0; i < rows.length - 1; i++)
        for (let j = 0; j < cols.length - 1; j++)
            rectangles.push({
                left: cols[j],
                width: cols[j + 1] - cols[j],
                top: rows[i],
                height: rows[i + 1] - rows[i]
            })

    return rectangles;
}