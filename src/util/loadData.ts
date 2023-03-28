import glob from 'glob';
import {formatYearMonth, YearMonth} from "./yearMonth";
import {readFileSync} from "fs";
import {RAW_DATA, RawDataItemType} from "./data";

export type InflationData = {
    [key: string]: number
}

export const loadInflationData = (): InflationData => {
    const inflationData: InflationData = {}
    const csvData = readFileSync("cpiu.csv", {encoding: "utf-8"});
    for (const line of csvData.split("\n").slice(1)) {
        const values = line.split(",");
        const year = parseInt(values[0]);
        if (year && year >= 1977) {
            for (let month = 1; month <= 12; month += 1) {
                const val = parseFloat(values[month]);
                if (val) {
                    inflationData[formatYearMonth({year, month})] = val;
                }
            }
        }
    }
    return inflationData;
}

export interface DataItemType extends RawDataItemType {
    img300Webp: string,
    img600Webp: string,
    img900Webp: string,
    img1200Webp: string,
    img1800Webp: string,
    img300Jpeg: string,
    img600Jpeg: string,
    img900Jpeg: string,
    img1200Jpeg: string,
    img1800Jpeg: string,
}

export interface DataType {
    earliest_year_month: YearMonth,
    inflation_year_month: YearMonth,
    data: DataItemType[],
}

export const loadData = (): DataType => {
    return {
        ...RAW_DATA,
        data: RAW_DATA.data.map(data => {
            return {
                ...data,
                img300Webp: "/" + glob.sync(`img/${data.img}*-300.webp`, {cwd: "public"})[0],
                img600Webp: "/" + glob.sync(`img/${data.img}*-600.webp`, {cwd: "public"})[0],
                img900Webp: "/" + glob.sync(`img/${data.img}*-900.webp`, {cwd: "public"})[0],
                img1200Webp: "/" + glob.sync(`img/${data.img}*-1200.webp`, {cwd: "public"})[0],
                img1800Webp: "/" + glob.sync(`img/${data.img}*-1800.webp`, {cwd: "public"})[0],
                img300Jpeg: "/" + glob.sync(`img/${data.img}*-300.jpg`, {cwd: "public"})[0],
                img600Jpeg: "/" + glob.sync(`img/${data.img}*-600.jpg`, {cwd: "public"})[0],
                img900Jpeg: "/" + glob.sync(`img/${data.img}*-900.jpg`, {cwd: "public"})[0],
                img1200Jpeg: "/" + glob.sync(`img/${data.img}*-1200.jpg`, {cwd: "public"})[0],
                img1800Jpeg: "/" + glob.sync(`img/${data.img}*-1800.jpg`, {cwd: "public"})[0],
            }
        }),
    }
}

export interface ClientDataItemType {
    type: "home" | "handheld" | "hybrid",
    release_year_month: YearMonth,
    orig_prices: number[],
    manufacturer: string,
    names: string[],
    affiliateLink?: string,
}

export interface ClientDataType {
    earliest_year_month: YearMonth,
    inflation_year_month: YearMonth,
    data: ClientDataItemType[],
}

export const loadClientData = (): ClientDataType => {
    return {
        earliest_year_month: RAW_DATA.earliest_year_month,
        inflation_year_month: RAW_DATA.inflation_year_month,
        data: RAW_DATA.data.map((item) => {
            return {
                type: item.type,
                release_year_month: item.release_year_month,
                orig_prices: item.orig_prices,
                manufacturer: item.manufacturer,
                names: item.names,
                affiliateLink: item.affiliateLink,
            }
        })
    }
}
