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

export const yearMonthsEqual = (a: YearMonth, b: YearMonth): boolean => {
    return a.year === b.year && a.month === b.month;
}

export const greaterThanOrEqual = (left: YearMonth, right: YearMonth): boolean => {
    if (left.year > right.year) {
        return true;
    } else if (left.year === right.year && left.month >= right.month) {
        return true;
    } else {
        return false;
    }
}

export const monthsBetween = (from: YearMonth, to: YearMonth): number => {
    // Examples:
    // 2020-01 => 2022-10 === 34
    // 2020-10 => 2022-01 === 16
    const years = to.year - from.year;
    const months = to.month - from.month;
    if (months >= 0) {
        return years * 12 + months;
    } else {
        return (years - 1) * 12 + (months + 12);
    }
}

export const addMonths = (from: YearMonth, months: number): YearMonth => {
    const addYears = Math.floor(months / 12);
    const addMonths = months % 12;
    const year = from.year + addYears;
    const month = from.month + addMonths;
    if (month <= 12) {
        return {year, month}
    } else {
        return {year: year + 1, month: month - 12}
    }
}
