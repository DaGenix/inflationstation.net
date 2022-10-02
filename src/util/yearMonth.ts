export type YearMonth = {
    year: number,
    month: number,
}

export const compareYearMonth = (a: YearMonth, b: YearMonth): number => {
    if (a.year !== b.year) {
        return a.year - b.year;
    } else if (a.month !== b.month) {
        return a.month - b.month;
    } else {
        return 0
    }
}

export const parseYearMonth = (arg: string | undefined): YearMonth | undefined => {
    if (!arg) {
        return undefined;
    }
    const match = arg.match(/^(\d{4})-(\d{2})$/);
    if (!match) {
        return undefined;
    }
    const [_, yearString, monthString] = match;
    const year = parseInt(yearString);
    const month = parseInt(monthString);
    if (year >= 1900 && year < 2100 && month >= 1 && month <= 12) {
        return {year, month};
    } else {
        return undefined;
    }
}

export const formatYearMonth = (yearMonth: YearMonth): string => {
    const monthString = `${yearMonth.month}`.padStart(2, "0");
    return `${yearMonth.year}-${monthString}`;
}
