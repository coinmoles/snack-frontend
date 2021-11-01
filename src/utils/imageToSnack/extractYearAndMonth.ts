export const extractYearAndMonth = (title: string): { 
    year: number, month: number 
} => {
    const [ year, month ] = Array.from(title.matchAll(/\d+/g), match => parseInt(match[0]));
    
    return {
        year,
        month
    }
}