const fs = require('fs');
const hb = require("handlebars");
const inflation = require("us-inflation");

const DATA = {
    inflation_year: 2017,
    data: [
        {
            raw_orig_price: 199,
            name: "NES",
            manufacturer: "Nintendo",
            year: 1985,
            img: "NES-Console-Set",
            link: "https://en.wikipedia.org/wiki/Nintendo_Entertainment_System",
        },
        {
            raw_orig_price: 199,
            name: "SNES",
            manufacturer: "Nintendo",
            year: 1991,
            img: "SNES-Mod1-Console-Set",
            link: "https://en.wikipedia.org/wiki/Super_Nintendo_Entertainment_System",
        },
        {
            raw_orig_price: 199,
            name: "Nintendo 64",
            manufacturer: "Nintendo",
            year: 1996,
            img: "Nintendo-64-wController-L",
            link: "https://en.wikipedia.org/wiki/Nintendo_64",
        },
        {
            raw_orig_price: 199,
            name: "GameCube",
            manufacturer: "Nintendo",
            year: 2001,
            img: "GameCube-Set",
            link: "https://en.wikipedia.org/wiki/GameCube",
        },
        {
            raw_orig_price: 249,
            name: "Wii",
            manufacturer: "Nintendo",
            year: 2006,
            img: "Wii-console",
            link: "https://en.wikipedia.org/wiki/Wii",
        },
        {
            raw_orig_price: 349,
            name: "Wii U",
            manufacturer: "Nintendo",
            year: 2012,
            img: "Wii_U_Console_and_Gamepad",
            link: "https://en.wikipedia.org/wiki/Wii_U",
        },
        {
            raw_orig_price: 299,
            name: "Switch",
            manufacturer: "Nintendo",
            year: 2017,
            img: "Nintendo-Switch-wJoyCons-BlRd-Standing-FL",
            link: "https://en.wikipedia.org/wiki/Nintendo_Switch",
        },
        {
            raw_orig_price: 299,
            name: "PlayStation",
            manufacturer: "Sony",
            year: 1995,
            img: "PSX-Console-wController",
            link: "https://en.wikipedia.org/wiki/PlayStation",
        },
        {
            raw_orig_price: 299,
            name: "PlayStation 2",
            manufacturer: "Sony",
            year: 2000,
            img: "Sony-PlayStation-2-30001-Console-FL",
            link: "https://en.wikipedia.org/wiki/PlayStation_2",
        },
        {
            raw_orig_price: 499,
            name: "PlayStation 3",
            manufacturer: "Sony",
            year: 2006,
            img: "Sony-PlayStation-3-CECHA01-wController-L",
            link: "https://en.wikipedia.org/wiki/PlayStation_3",
        },
        {
            raw_orig_price: 399,
            name: "PlayStation 4",
            manufacturer: "Sony",
            year: 2013,
            img: "Sony-PlayStation-4-wController",
            link: "https://en.wikipedia.org/wiki/PlayStation_4",
        },
        {
            raw_orig_price: 299,
            name: "Xbox",
            manufacturer: "Microsoft",
            year: 2001,
            img: "Xbox-Console-wDuke-L",
            link: "https://en.wikipedia.org/wiki/Xbox_(console)",
        },
        {
            raw_orig_price: 299,
            name: "Xbox 360",
            manufacturer: "Microsoft",
            year: 2005,
            img: "Microsoft-Xbox-360-Pro-Flat-wController-L",
            link: "https://en.wikipedia.org/wiki/Xbox_360",
        },
        {
            raw_orig_price: 499,
            name: "Xbox One",
            manufacturer: "Microsoft",
            year: 2013,
            img: "Xbox-One-Console-wController-FL",
            link: "https://en.wikipedia.org/wiki/Xbox_One",
        },
        {
            raw_orig_price: 200,
            name: "Master System",
            manufacturer: "Sega",
            year: 1986,
            img: "Sega-Master-System-Set",
            link: "https://en.wikipedia.org/wiki/Master_System",
        },
        {
            raw_orig_price: 189,
            name: "Sega Genesis",
            manufacturer: "Sega",
            year: 1989,
            img: "Sega-Genesis-Mk2-6button",
            link: "https://en.wikipedia.org/wiki/Sega_Genesis",
        },
        {
            raw_orig_price: 399,
            name: "Sega Saturn",
            manufacturer: "Sega",
            year: 1995,
            img: "Sega-Saturn-Console-Set-Mk1",
            link: "https://en.wikipedia.org/wiki/Sega_Saturn",
        },
        {
            raw_orig_price: 199,
            name: "DreamCast",
            manufacturer: "Sega",
            year: 1999,
            img: "Dreamcast-Console-Set",
            link: "https://en.wikipedia.org/wiki/Dreamcast",
        },
        {
            raw_orig_price: 199,
            name: "Atari 2600",
            manufacturer: "Atari",
            year: 1977,
            img: "Atari-2600-Wood-4Sw-Set",
            link: "https://en.wikipedia.org/wiki/Atari_2600",
        },
        {
            raw_orig_price: 269,
            name: "Atari 5200",
            manufacturer: "Atari",
            year: 1982,
            img: "Atari-5200-4-Port-wController-L",
            link: "https://en.wikipedia.org/wiki/Atari_5200",
        },
        {
            raw_orig_price: 139,
            name: "Atari 7800",
            manufacturer: "Atari",
            year: 1986,
            img: "Atari-7800-Console-Set",
            link: "https://en.wikipedia.org/wiki/Atari_7800",
        },
        {
            raw_orig_price: 249,
            name: "Atari Jaguar",
            manufacturer: "Atari",
            year: 1993,
            img: "Atari-Jaguar-Console-Set",
            link: "https://en.wikipedia.org/wiki/Atari_Jaguar",
        },
        {
            raw_orig_price: 299,
            name: "Intellivision",
            manufacturer: "Mattel",
            year: 1979,
            img: "Intellivision-Console-Set",
            link: "https://en.wikipedia.org/wiki/Intellivision",
        },
        {
            raw_orig_price: 175,
            name: "ColecoVision",
            manufacturer: "Coleco",
            year: 1982,
            img: "ColecoVision-wController-L",
            link: "https://en.wikipedia.org/wiki/ColecoVision",
        },
        {
            raw_orig_price: 199,
            name: "TurboGrafx-16",
            manufacturer: "Hudson Soft & Nec Home Electronics",
            year: 1989,
            img: "TurboGrafx16-Console-Set",
            link: "https://en.wikipedia.org/wiki/TurboGrafx-16",
        },
        {
            raw_orig_price: 649,
            name: "Neo Geo",
            manufacturer: "SNK",
            year: 1990,
            img: "Neo-Geo-AES-Console-Set",
            link: "https://en.wikipedia.org/wiki/Neo_Geo_(system)",
        },
        {
            raw_orig_price: 699,
            name: "3DO",
            manufacturer: "3DO",
            year: 1993,
            img: "3DO-FZ1-Console-Set",
            link: "https://en.wikipedia.org/wiki/3DO_Interactive_Multiplayer",
        },
    ],
}

DATA.data.sort((a, b) => {
    if (a.year != b.year) {
        return a.year - b.year;
    } else {
        return a.name.localeCompare(b.name);
    }
});

for (data of DATA.data) {
    data.raw_price = inflation({year: data.year, amount: data.raw_orig_price}, {year: DATA.inflation_year});
    data.price = data.raw_price.toLocaleString();
    data.orig_price = data.raw_orig_price.toLocaleString()
}

const template = fs.readFileSync("index.hbs", {encoding: "utf-8"});

const html = hb.compile(template)(DATA)

fs.writeFileSync(process.argv[2], html, {encoding: "utf-8"});