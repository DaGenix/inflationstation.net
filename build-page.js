const fs = require('fs');
const hb = require("handlebars");
const inflation = require("us-inflation");

const DATA = {
    inflation_year: 2017,
    data: [
        {
            orig_price: 199,
            name: "NES",
            year: 1985,
            img: "NES-Console-Set",
            link: "https://en.wikipedia.org/wiki/Nintendo_Entertainment_System",
        },
        {
            orig_price: 199,
            name: "SNES",
            year: 1991,
            img: "SNES-Mod1-Console-Set",
            link: "https://en.wikipedia.org/wiki/Super_Nintendo_Entertainment_System",
        },
        {
            orig_price: 199,
            name: "Nintendo 64",
            year: 1996,
            img: "Nintendo-64-wController-L",
            link: "https://en.wikipedia.org/wiki/Nintendo_64",
        },
        {
            orig_price: 199,
            name: "GameCube",
            year: 2001,
            img: "GameCube-Set",
            link: "https://en.wikipedia.org/wiki/GameCube",
        },
        {
            orig_price: 249,
            name: "Wii",
            year: 2006,
            img: "Wii-console",
            link: "https://en.wikipedia.org/wiki/Wii",
        },
        {
            orig_price: 349,
            name: "Wii U",
            year: 2012,
            img: "Wii_U_Console_and_Gamepad",
            link: "https://en.wikipedia.org/wiki/Wii_U",
        },
        {
            orig_price: 299,
            name: "Switch",
            year: 2017,
            img: "Nintendo-Switch-wJoyCons-BlRd-Standing-FL",
            link: "https://en.wikipedia.org/wiki/Nintendo_Switch",
        },
        {
            orig_price: 299,
            name: "PlayStation",
            year: 1995,
            img: "PSX-Console-wController",
            link: "https://en.wikipedia.org/wiki/PlayStation",
        },
        {
            orig_price: 299,
            name: "PlayStation 2",
            year: 2000,
            img: "Sony-PlayStation-2-30001-Console-FL",
            link: "https://en.wikipedia.org/wiki/PlayStation_2",
        },
        {
            orig_price: 499,
            name: "PlayStation 3",
            year: 2006,
            img: "Sony-PlayStation-3-CECHA01-wController-L",
            link: "https://en.wikipedia.org/wiki/PlayStation_3",
        },
        {
            orig_price: 399,
            name: "PlayStation 4",
            year: 2013,
            img: "Sony-PlayStation-4-wController",
            link: "https://en.wikipedia.org/wiki/PlayStation_4",
        },
        {
            orig_price: 299,
            name: "Xbox",
            year: 2001,
            img: "Xbox-Console-wDuke-L",
            link: "https://en.wikipedia.org/wiki/Xbox_(console)",
        },
        {
            orig_price: 299,
            name: "Xbox 360",
            year: 2005,
            img: "Microsoft-Xbox-360-Pro-Flat-wController-L",
            link: "https://en.wikipedia.org/wiki/Xbox_360",
        },
        {
            orig_price: 499,
            name: "Xbox One",
            year: 2013,
            img: "Xbox-One-Console-wController-FL",
            link: "https://en.wikipedia.org/wiki/Xbox_One",
        },
        {
            orig_price: 200,
            name: "Master System",
            year: 1986,
            img: "Sega-Master-System-Set",
            link: "https://en.wikipedia.org/wiki/Master_System",
        },
        {
            orig_price: 189,
            name: "Sega Genesis",
            year: 1989,
            img: "Sega-Genesis-Mk2-6button",
            link: "https://en.wikipedia.org/wiki/Sega_Genesis",
        },
        {
            orig_price: 399,
            name: "Sega Saturn",
            year: 1995,
            img: "Sega-Saturn-Console-Set-Mk1",
            link: "https://en.wikipedia.org/wiki/Sega_Saturn",
        },
        {
            orig_price: 199,
            name: "DreamCast",
            year: 1999,
            img: "Dreamcast-Console-Set",
            link: "https://en.wikipedia.org/wiki/Dreamcast",
        },
        {
            orig_price: 199,
            name: "Atari 2600",
            year: 1977,
            img: "Atari-2600-Wood-4Sw-Set",
            link: "https://en.wikipedia.org/wiki/Atari_2600",
        },
        {
            orig_price: 269,
            name: "Atari 5200",
            year: 1982,
            img: "Atari-5200-4-Port-wController-L",
            link: "https://en.wikipedia.org/wiki/Atari_5200",
        },
        {
            orig_price: 139,
            name: "Atari 7800",
            year: 1986,
            img: "Atari-7800-Console-Set",
            link: "https://en.wikipedia.org/wiki/Atari_7800",
        },
        {
            orig_price: 249,
            name: "Atari Jaguar",
            year: 1993,
            img: "Atari-Jaguar-Console-Set",
            link: "https://en.wikipedia.org/wiki/Atari_Jaguar",
        },
        {
            orig_price: 299,
            name: "Intellivision",
            year: 1979,
            img: "Intellivision-Console-Set",
            link: "https://en.wikipedia.org/wiki/Intellivision",
        },
        {
            orig_price: 175,
            name: "ColecoVision",
            year: 1982,
            img: "ColecoVision-wController-L",
            link: "https://en.wikipedia.org/wiki/ColecoVision",
        },
        {
            orig_price: 199,
            name: "TurboGrafx-16",
            year: 1989,
            img: "TurboGrafx16-Console-Set",
            link: "https://en.wikipedia.org/wiki/TurboGrafx-16",
        },
        {
            orig_price: 649,
            name: "Neo Geo",
            year: 1990,
            img: "Neo-Geo-AES-Console-Set",
            link: "https://en.wikipedia.org/wiki/Neo_Geo_(system)",
        },
        {
            orig_price: 699,
            name: "3DO",
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
    data.price = inflation({year: data.year, amount: data.orig_price}, {year: DATA.inflation_year});
    data.price = data.price.toLocaleString();
}

const template = fs.readFileSync("index.hbs", {encoding: "utf-8"});

const html = hb.compile(template)(DATA)

fs.writeFileSync(process.argv[2], html, {encoding: "utf-8"});