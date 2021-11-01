import { DateTime } from "luxon";
import { SnackData } from "../interface/SnackData";
import { SnackText } from "../interface/SnackText";

export const postSnackData = async (snackTexts: SnackText[], year: number, month: number): Promise<SnackData[]> => {
    let date = DateTime.fromObject({
        year,
        month,
        day: 1
    }).setLocale("ko-KR")
    while (![1, 2, 3, 4].includes(date.weekday)) {
        date = date.plus({ days: 1 })
    }

    const snackDatas: SnackData[] = [];

    for (const snackText of snackTexts) {
        const snackData: SnackData = {
            year: date.year,
            month: date.month,
            day: date.day,
            snack: snackText.snackText.replace(/ /g, "")
        }
        
        if (!/^[\s,\\/]*$/g.test(snackData.snack))
            snackDatas.push(snackData);

        if (snackText.dateText !== '') {
            if ([1, 2, 3].includes(date.weekday))
                date = date.plus({ days: 1 });
            else if (date.weekday === 4)
                date = date.plus({ days: 4 });
        }
    }   

    return snackDatas;
}