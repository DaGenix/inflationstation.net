import {readFileSync} from 'fs';
import {compareYearMonth, formatYearMonth, YearMonth} from "./yearMonth";
import {ClientDataItemType, DataItemType, InflationData} from "./loadData";

function inflation(inflationData: InflationData, from: YearMonth, ammount, to: YearMonth) {
    return ammount / inflationData[formatYearMonth(from)] * inflationData[formatYearMonth(to)];
}

export const priceAfterInflation = (inflationData: InflationData, dataItem: ClientDataItemType | DataItemType | RawDataItemType, asOf: YearMonth): number[] => {
    return dataItem.orig_prices.map(price => {
        const from = {
            year: dataItem.release_year_month.year,
            month: dataItem.release_year_month.month,
        }
        return Math.round(inflation(inflationData, from, price, asOf));
    })
}

export interface RawDataItemType {
    type: "home" | "handheld" | "hybrid",
    orig_prices: number[],
    names: string[],
    manufacturer: string,
    release_year_month: YearMonth,
    img: string,
    link: string,
    affiliateLink?: string,
}

export interface RawDataType {
    earliest_year_month: YearMonth,
    inflation_year_month: YearMonth,
    data: RawDataItemType[],
}

export const RAW_DATA: RawDataType = {
    earliest_year_month: {
        year: 1977,
        month: 9,
    },
    inflation_year_month: {
        year: 2023,
        month: 2,
    },
    data: [
        {
            type: "home",
            orig_prices: [199],
            names: ["Nintendo Entertainment System", "NES"],
            manufacturer: "Nintendo",
            release_year_month: {year: 1985, month: 10},
            img: "NES-Console-Set",
            link: "https://en.wikipedia.org/wiki/Nintendo_Entertainment_System",
        },
        {
            type: "home",
            orig_prices: [199],
            names: ["Super Nintendo Entertainment System", "SNES", "Super Nintendo", "Super NES"],
            manufacturer: "Nintendo",
            release_year_month: {year: 1991, month: 8},
            img: "SNES-Mod1-Console-Set",
            link: "https://en.wikipedia.org/wiki/Super_Nintendo_Entertainment_System",
        },
        {
            type: "home",
            orig_prices: [199],
            names: ["Nintendo 64", "N64"],
            manufacturer: "Nintendo",
            release_year_month: {year: 1996, month: 9},
            img: "Nintendo-64-wController-L",
            link: "https://en.wikipedia.org/wiki/Nintendo_64",
        },
        {
            type: "home",
            orig_prices: [199],
            names: ["GameCube"],
            manufacturer: "Nintendo",
            release_year_month: {year: 2001, month: 11},
            img: "GameCube-Set",
            link: "https://en.wikipedia.org/wiki/GameCube",
        },
        {
            type: "home",
            orig_prices: [249],
            names: ["Wii"],
            manufacturer: "Nintendo",
            release_year_month: {year: 2006, month: 11},
            img: "Wii-console",
            link: "https://en.wikipedia.org/wiki/Wii",
        },
        {
            type: "home",
            orig_prices: [349],
            names: ["Wii U"],
            manufacturer: "Nintendo",
            release_year_month: {year: 2012, month: 11},
            img: "Wii_U_Console_and_Gamepad",
            link: "https://en.wikipedia.org/wiki/Wii_U",
        },
        {
            type: "hybrid",
            orig_prices: [299],
            names: ["Nintendo Switch"],
            manufacturer: "Nintendo",
            release_year_month: {year: 2017, month: 3},
            img: "Nintendo-Switch-wJoyCons-BlRd-Standing-FL",
            link: "https://en.wikipedia.org/wiki/Nintendo_Switch",
            affiliateLink: "https://www.amazon.com/Nintendo-Switch-Neon-Blue-Joy%E2%80%91/dp/B07VGRJDFY?th=1&psc=1&linkCode=ll1&tag=inflationstation-20&linkId=40f15625583b82ab9f7cfc7919e1e2a2&language=en_US&ref_=as_li_ss_tl",
        },
        {
            type: "home",
            orig_prices: [299],
            names: ["PlayStation"],
            manufacturer: "Sony",
            release_year_month: {year: 1995, month: 12},
            img: "PSX-Console-wController",
            link: "https://en.wikipedia.org/wiki/PlayStation",
        },
        {
            type: "home",
            orig_prices: [299],
            names: ["PlayStation 2"],
            manufacturer: "Sony",
            release_year_month: {year: 2000, month: 10},
            img: "Sony-PlayStation-2-30001-Console-FL",
            link: "https://en.wikipedia.org/wiki/PlayStation_2",
        },
        {
            type: "home",
            orig_prices: [499],
            names: ["PlayStation 3"],
            manufacturer: "Sony",
            release_year_month: {year: 2006, month: 11},
            img: "Sony-PlayStation-3-CECHA01-wController-L",
            link: "https://en.wikipedia.org/wiki/PlayStation_3",
        },
        {
            type: "home",
            orig_prices: [399],
            names: ["PlayStation 4"],
            manufacturer: "Sony",
            release_year_month: {year: 2013, month: 11},
            img: "Sony-PlayStation-4-wController",
            link: "https://en.wikipedia.org/wiki/PlayStation_4",
        },
        {
            type: "home",
            orig_prices: [499],
            names: ["PlayStation 5"],
            manufacturer: "Sony",
            release_year_month: {year: 2020, month: 11},
            img: "playstation-5-with-dualsense-front-product-shot-01-ps5-en-30jul20",
            link: "https://en.wikipedia.org/wiki/PlayStation_5",
            affiliateLink: "https://www.amazon.com/PlayStation-5-Console/dp/B09DFCB66S?&linkCode=ll1&tag=inflationstation-20&linkId=a4e36a4170b6071252dabb53421c4b94&language=en_US&ref_=as_li_ss_tl",
        },
        {
            type: "home",
            orig_prices: [399],
            names: ["PlayStation 5 Digital Edition"],
            manufacturer: "Sony",
            release_year_month: {year: 2020, month: 11},
            img: "playstation-5-digital-edition-with-dualsense-front-product-shot-01-ps5-en-30jul20",
            link: "https://en.wikipedia.org/wiki/PlayStation_5",
            affiliateLink: "https://www.amazon.com/PlayStation-5-Digital/dp/B09DFHJTF5?&linkCode=ll1&tag=inflationstation-20&linkId=743e59b41d1b621bf4621e98864dbe5b&language=en_US&ref_=as_li_ss_tl",
        },
        {
            type: "home",
            orig_prices: [299],
            names: ["Xbox"],
            manufacturer: "Microsoft",
            release_year_month: {year: 2001, month: 11},
            img: "Xbox-Console-wDuke-L",
            link: "https://en.wikipedia.org/wiki/Xbox_(console)",
        },
        {
            type: "home",
            orig_prices: [299],
            names: ["Xbox 360"],
            manufacturer: "Microsoft",
            release_year_month: {year: 2005, month: 11},
            img: "Microsoft-Xbox-360-Pro-Flat-wController-L",
            link: "https://en.wikipedia.org/wiki/Xbox_360",
        },
        {
            type: "home",
            orig_prices: [499],
            names: ["Xbox One"],
            manufacturer: "Microsoft",
            release_year_month: {year: 2013, month: 11},
            img: "Xbox-One-Console-wController-FL",
            link: "https://en.wikipedia.org/wiki/Xbox_One",
        },
        {
            type: "home",
            orig_prices: [499],
            names: ["Xbox Series X"],
            manufacturer: "Microsoft",
            release_year_month: {year: 2020, month: 11},
            img: "xbox_series_x",
            link: "https://en.wikipedia.org/wiki/Xbox_Series_X_and_Series_S",
            affiliateLink: "https://www.amazon.com/Xbox-X/dp/B08H75RTZ8?brr=1&pd_rd_r=29c5976d-3641-4cad-a43d-6b3220943f39&pd_rd_w=hnnbQ&pd_rd_wg=zy0Va&qid=1637781679&qsid=140-7325183-0404943&rd=1&s=videogames&sr=1-4&sres=B087VM5XC6%2CB09M94WS14%2CB09MC1VCPQ%2CB08H75RTZ8%2CB08VWQ74JZ%2CB093PPX7SY%2CB09MCQ4J78%2CB08NCFB34H%2CB08XX73P3N%2CB098D55397%2CB08P3YX827%2CB093RRXDFJ%2CB0921N4HVP%2CB091CYFL3C%2CB08NC5LQJ6%2CB099M4DB5R&linkCode=ll1&tag=inflationstation-20&linkId=be2d45ed5b30c58afd5612a630cc717f&language=en_US&ref_=as_li_ss_tl",
        },
        {
            type: "home",
            orig_prices: [299],
            names: ["Xbox Series S"],
            manufacturer: "Microsoft",
            release_year_month: {year: 2020, month: 11},
            img: "xbox_series_s",
            link: "https://en.wikipedia.org/wiki/Xbox_Series_X_and_Series_S",
            affiliateLink: "https://www.amazon.com/Xbox-S/dp/B08G9J44ZN?brr=1&pd_rd_r=29c5976d-3641-4cad-a43d-6b3220943f39&pd_rd_w=hnnbQ&pd_rd_wg=zy0Va&qid=1637781679&qsid=140-7325183-0404943&rd=1&s=videogames&sr=1-4&sres=B087VM5XC6%2CB09M94WS14%2CB09MC1VCPQ%2CB08H75RTZ8%2CB08VWQ74JZ%2CB093PPX7SY%2CB09MCQ4J78%2CB08NCFB34H%2CB08XX73P3N%2CB098D55397%2CB08P3YX827%2CB093RRXDFJ%2CB0921N4HVP%2CB091CYFL3C%2CB08NC5LQJ6%2CB099M4DB5R&linkCode=ll1&tag=inflationstation-20&linkId=d4bec2b97a4803a614c6f23d8eb75dfc&language=en_US&ref_=as_li_ss_tl",
        },
        {
            type: "home",
            orig_prices: [200],
            names: ["Master System"],
            manufacturer: "Sega",
            release_year_month: {year: 1986, month: 9},
            img: "Sega-Master-System-Set",
            link: "https://en.wikipedia.org/wiki/Master_System",
        },
        {
            type: "home",
            orig_prices: [189],
            names: ["Sega Genesis"],
            manufacturer: "Sega",
            release_year_month: {year: 1989, month: 8},
            img: "Sega-Genesis-Mk2-6button",
            link: "https://en.wikipedia.org/wiki/Sega_Genesis",
        },
        {
            type: "home",
            orig_prices: [399],
            names: ["Sega Saturn"],
            manufacturer: "Sega",
            release_year_month: {year: 1995, month: 5},
            img: "Sega-Saturn-Console-Set-Mk1",
            link: "https://en.wikipedia.org/wiki/Sega_Saturn",
        },
        {
            type: "home",
            orig_prices: [199],
            names: ["Dreamcast"],
            manufacturer: "Sega",
            release_year_month: {year: 1999, month: 9},
            img: "Dreamcast-Console-Set",
            link: "https://en.wikipedia.org/wiki/Dreamcast",
        },
        {
            type: "home",
            orig_prices: [199],
            names: ["Atari 2600"],
            manufacturer: "Atari",
            release_year_month: {year: 1977, month: 9},
            img: "Atari-2600-Wood-4Sw-Set",
            link: "https://en.wikipedia.org/wiki/Atari_2600",
        },
        {
            type: "home",
            orig_prices: [269],
            names: ["Atari 5200"],
            manufacturer: "Atari",
            release_year_month: {year: 1982, month: 11},
            img: "Atari-5200-4-Port-wController-L",
            link: "https://en.wikipedia.org/wiki/Atari_5200",
        },
        {
            type: "home",
            orig_prices: [139],
            names: ["Atari 7800"],
            manufacturer: "Atari",
            release_year_month: {year: 1986, month: 5},
            img: "Atari-7800-Console-Set",
            link: "https://en.wikipedia.org/wiki/Atari_7800",
        },
        {
            type: "home",
            orig_prices: [249],
            names: ["Atari Jaguar"],
            manufacturer: "Atari",
            release_year_month: {year: 1993, month: 11},
            img: "Atari-Jaguar-Console-Set",
            link: "https://en.wikipedia.org/wiki/Atari_Jaguar",
        },
        {
            type: "home",
            orig_prices: [299],
            names: ["Intellivision"],
            manufacturer: "Mattel",
            // source: https://www.atariarchive.org/mattel-intellivision-game-release-dates/
            // I picked February 1980 since that is when national advertising stared.
            release_year_month: {year: 1980, month: 2},
            img: "Intellivision-Console-Set",
            link: "https://en.wikipedia.org/wiki/Intellivision",
        },
        {
            type: "home",
            orig_prices: [175],
            names: ["ColecoVision"],
            manufacturer: "Coleco",
            release_year_month: {year: 1982, month: 8},
            img: "ColecoVision-wController-L",
            link: "https://en.wikipedia.org/wiki/ColecoVision",
        },
        {
            type: "home",
            orig_prices: [199],
            names: ["TurboGrafx-16"],
            manufacturer: "Hudson Soft & Nec Home Electronics",
            release_year_month: {year: 1989, month: 8},
            img: "TurboGrafx16-Console-Set",
            link: "https://en.wikipedia.org/wiki/TurboGrafx-16",
        },
        {
            type: "home",
            orig_prices: [649],
            names: ["Neo Geo"],
            manufacturer: "SNK",
            release_year_month: {year: 1990, month: 8},
            img: "Neo-Geo-AES-Console-Set",
            link: "https://en.wikipedia.org/wiki/Neo_Geo_(system)",
        },
        {
            type: "home",
            orig_prices: [699],
            names: ["3DO Interactive Multiplayer"],
            manufacturer: "3DO",
            release_year_month: {year: 1993, month: 10},
            img: "3DO-FZ1-Console-Set",
            link: "https://en.wikipedia.org/wiki/3DO_Interactive_Multiplayer",
        },
        {
            type: "handheld",
            orig_prices: [89],
            names: ["Game Boy"],
            manufacturer: "Nintendo",
            release_year_month: {year: 1989, month: 7},
            img: "Game-Boy-FL",
            link: "https://en.wikipedia.org/wiki/Game_Boy",
        },
        {
            type: "handheld",
            orig_prices: [179],
            names: ["Virtual Boy"],
            manufacturer: "Nintendo",
            release_year_month: {year: 1995, month: 8},
            img: "Virtual-Boy-Set",
            link: "https://en.wikipedia.org/wiki/Virtual_Boy",
        },
        {
            type: "handheld",
            orig_prices: [69],
            names: ["Game Boy Color"],
            manufacturer: "Nintendo",
            release_year_month: {year: 1998, month: 11},
            img: "Nintendo-Game-Boy-Color-FL",
            link: "https://en.wikipedia.org/wiki/Game_Boy_Color",
        },
        {
            type: "handheld",
            orig_prices: [99],
            names: ["Game Boy Advance"],
            manufacturer: "Nintendo",
            release_year_month: {year: 2001, month: 6},
            img: "Nintendo-Game-Boy-Advance-Purple-FL",
            link: "https://en.wikipedia.org/wiki/Game_Boy_Advance",
        },
        {
            type: "handheld",
            orig_prices: [149],
            names: ["Nintendo DS"],
            manufacturer: "Nintendo",
            release_year_month: {year: 2004, month: 11},
            img: "Nintendo-DS-Lite-Black-Open",
            link: "https://en.wikipedia.org/wiki/Nintendo_ds",
        },
        {
            type: "handheld",
            orig_prices: [249],
            names: ["Nintendo 3DS"],
            manufacturer: "Nintendo",
            release_year_month: {year: 2011, month: 3},
            img: "Nintendo-3DS-AquaOpen",
            link: "https://en.wikipedia.org/wiki/3ds",
        },
        {
            type: "handheld",
            orig_prices: [249],
            names: ["PlayStation Portable", "PSP"],
            manufacturer: "Sony",
            release_year_month: {year: 2005, month: 3},
            img: "Psp-1000",
            link: "https://en.wikipedia.org/wiki/PlayStation_Portable",
        },
        {
            type: "handheld",
            orig_prices: [249],
            names: ["PlayStation Vita"],
            manufacturer: "Sony",
            release_year_month: {year: 2012, month: 2},
            img: "PlayStation-Vita-1101-FL",
            link: "https://en.wikipedia.org/wiki/PlayStation_Vita",
        },
        {
            type: "handheld",
            orig_prices: [179],
            names: ["Atari Lynx"],
            manufacturer: "Atari",
            release_year_month: {year: 1989, month: 9},
            img: "Atari-Lynx-Handheld-Angled",
            link: "https://en.wikipedia.org/wiki/Atari_Lynx",
        },
        {
            type: "handheld",
            orig_prices: [149],
            names: ["Game Gear"],
            manufacturer: "Sega",
            release_year_month: {year: 1991, month: 4},
            img: "Game-Gear-Handheld",
            link: "https://en.wikipedia.org/wiki/Game_gear",
        },
        {
            type: "handheld",
            orig_prices: [180],
            names: ["Sega Nomad"],
            manufacturer: "Sega",
            release_year_month: {year: 1995, month: 10},
            img: "Sega-Nomad-Front",
            link: "https://en.wikipedia.org/wiki/Sega_Nomad",
        },
        {
            type: "handheld",
            orig_prices: [249],
            names: ["TurboExpress"],
            manufacturer: "NEC",
            release_year_month: {year: 1990, month: 12},
            img: "NEC-TurboExpress-Upright-FL",
            link: "https://en.wikipedia.org/wiki/TurboExpress",
        },
        {
            type: "handheld",
            orig_prices: [69],
            names: ["Game.com"],
            manufacturer: "Tiger",
            release_year_month: {year: 1997, month: 9},
            img: "Tiger-Game-Com-FL",
            link: "https://en.wikipedia.org/wiki/Game.com",
        },
        {
            type: "handheld",
            orig_prices: [69],
            names: ["Neo Geo Pocket Color"],
            manufacturer: "SNK",
            release_year_month: {year: 1999, month: 8},
            img: "Neo-Geo-Pocket-Color-Blue-Left",
            link: "https://en.wikipedia.org/wiki/Neo_Geo_Pocket_Color",
        },
        /*
        Appears to have been Japan only
        {
            type: "handheld",
            orig_prices: [69],
            names: ["Neo Geo Pocket"],
            manufacturer: "SNK",
            release_year_month: {year: 1999, month: null},
            img: "Neo-Geo-Pocket-Anthra-Left",
            link: "https://en.wikipedia.org/wiki/Neo_Geo_Pocket",
        },
        */
        /*
        Appears to have been Japan only
        {
            type: "handheld",
            orig_prices: [???],
            names: ["WonderSwan"],
            manufacturer: "Bandai",
            release_year_month: {year: 1999, month: null},
            img: "",
            link: "",
        },
        */
        {
            type: "handheld",
            orig_prices: [299],
            names: ["N-Gage"],
            manufacturer: "Nokia",
            release_year_month: {year: 2003, month: 10},
            img: "Nokia-NGage-LL",
            link: "https://en.wikipedia.org/wiki/N-Gage_(device)",
        },
        {
            type: "handheld",
            orig_prices: [399, 529, 649],
            names: ["Steam Deck"],
            manufacturer: "Valve",
            release_year_month: {year: 2021, month: 2},
            img: "Steam-Deck",
            link: "https://en.wikipedia.org/wiki/Steam_Deck",
        },
        {
            type: "hybrid",
            orig_prices: [349],
            names: ["Nintendo Switch (OLED)"],
            manufacturer: "Nintendo",
            release_year_month: {year: 2021, month: 10},
            img: "Nintendo-Switch-wJoyCons-BlRd-Standing-FL",
            link: "https://en.wikipedia.org/wiki/Nintendo_Switch#OLED_model",
            affiliateLink: "https://www.amazon.com/gp/product/B098RKWHHZ/ref=as_li_qf_asin_il_tl?ie=UTF8&tag=inflationstation-20&creative=9325&linkCode=as2&creativeASIN=B098RKWHHZ&linkId=552853e8a3e14d8633e6ec58244230f4",
        },
        {
            type: "hybrid",
            orig_prices: [199],
            names: ["Nintendo Switch Lite"],
            manufacturer: "Nintendo",
            release_year_month: {year: 2019, month: 9},
            img: "Nintendo_Switch_Lite_representation",
            link: "https://en.wikipedia.org/wiki/Nintendo_Switch_Lite",
            affiliateLink: "https://www.amazon.com/Nintendo-Switch-Lite-Yellow/dp/B092VT1JGD?th=1&linkCode=ll1&tag=inflationstation-20&linkId=df354b37163cf5f11f3046eca1bdd3ac&language=en_US&ref_=as_li_ss_tl",
        },
    ],
}

RAW_DATA.data.sort((a, b) => {
    const releaseYearMonthCompare = -compareYearMonth(a.release_year_month, b.release_year_month);
    if (releaseYearMonthCompare !== 0) {
        return releaseYearMonthCompare;
    } else {
        return a.names[0].localeCompare(b.names[0]);
    }
});
