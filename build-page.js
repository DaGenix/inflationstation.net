const csvParse = require('csv-parse/lib/sync');
const templater = require("./templater");
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const glob = require('glob');
const util = require("util");

const CPIU_DATA = csvParse(fs.readFileSync("cpiu.csv", {encoding: "utf-8"}), {
    columns: true,
    skip_empty_lines: true
}).reduce((result, currentValue) => {
        result[currentValue["Year"]] = currentValue;
        return result;
    },
    {}
);

function inflation(fromYear, ammount, toYear, toMonth) {
    return ammount / CPIU_DATA[fromYear]["Jan"] * CPIU_DATA[toYear][toMonth];
}

const readFile = util.promisify(fs.readFile);

if (process.argv[2] == "dev") {
    devMode = true;
    destDir = "out";
} else if (process.argv[2] == "dist" || process.argv[2] == "upload") {
    devMode = false;
    destDir = "dist";
}

const DATA = {
    devMode: devMode,
    inflation_year: 2020,
    inflation_month: "Mar",
    data: [
        {
            type: "home",
            raw_orig_price: 199,
            name: "NES",
            manufacturer: "Nintendo",
            year: 1985,
            img: "NES-Console-Set",
            link: "https://en.wikipedia.org/wiki/Nintendo_Entertainment_System",
        },
        {
            type: "home",
            raw_orig_price: 199,
            name: "SNES",
            manufacturer: "Nintendo",
            year: 1991,
            img: "SNES-Mod1-Console-Set",
            link: "https://en.wikipedia.org/wiki/Super_Nintendo_Entertainment_System",
        },
        {
            type: "home",
            raw_orig_price: 199,
            name: "Nintendo 64",
            manufacturer: "Nintendo",
            year: 1996,
            img: "Nintendo-64-wController-L",
            link: "https://en.wikipedia.org/wiki/Nintendo_64",
        },
        {
            type: "home",
            raw_orig_price: 199,
            name: "GameCube",
            manufacturer: "Nintendo",
            year: 2001,
            img: "GameCube-Set",
            link: "https://en.wikipedia.org/wiki/GameCube",
        },
        {
            type: "home",
            raw_orig_price: 249,
            name: "Wii",
            manufacturer: "Nintendo",
            year: 2006,
            img: "Wii-console",
            link: "https://en.wikipedia.org/wiki/Wii",
        },
        {
            type: "home",
            raw_orig_price: 349,
            name: "Wii U",
            manufacturer: "Nintendo",
            year: 2012,
            img: "Wii_U_Console_and_Gamepad",
            link: "https://en.wikipedia.org/wiki/Wii_U",
        },
        {
            type: "hybrid",
            raw_orig_price: 299,
            name: "Switch",
            manufacturer: "Nintendo",
            year: 2017,
            img: "Nintendo-Switch-wJoyCons-BlRd-Standing-FL",
            link: "https://en.wikipedia.org/wiki/Nintendo_Switch",
        },
        {
            type: "home",
            raw_orig_price: 299,
            name: "PlayStation",
            manufacturer: "Sony",
            year: 1995,
            img: "PSX-Console-wController",
            link: "https://en.wikipedia.org/wiki/PlayStation",
        },
        {
            type: "home",
            raw_orig_price: 299,
            name: "PlayStation 2",
            manufacturer: "Sony",
            year: 2000,
            img: "Sony-PlayStation-2-30001-Console-FL",
            link: "https://en.wikipedia.org/wiki/PlayStation_2",
        },
        {
            type: "home",
            raw_orig_price: 499,
            name: "PlayStation 3",
            manufacturer: "Sony",
            year: 2006,
            img: "Sony-PlayStation-3-CECHA01-wController-L",
            link: "https://en.wikipedia.org/wiki/PlayStation_3",
        },
        {
            type: "home",
            raw_orig_price: 399,
            name: "PlayStation 4",
            manufacturer: "Sony",
            year: 2013,
            img: "Sony-PlayStation-4-wController",
            link: "https://en.wikipedia.org/wiki/PlayStation_4",
        },
        {
            type: "home",
            raw_orig_price: 299,
            name: "Xbox",
            manufacturer: "Microsoft",
            year: 2001,
            img: "Xbox-Console-wDuke-L",
            link: "https://en.wikipedia.org/wiki/Xbox_(console)",
        },
        {
            type: "home",
            raw_orig_price: 299,
            name: "Xbox 360",
            manufacturer: "Microsoft",
            year: 2005,
            img: "Microsoft-Xbox-360-Pro-Flat-wController-L",
            link: "https://en.wikipedia.org/wiki/Xbox_360",
        },
        {
            type: "home",
            raw_orig_price: 499,
            name: "Xbox One",
            manufacturer: "Microsoft",
            year: 2013,
            img: "Xbox-One-Console-wController-FL",
            link: "https://en.wikipedia.org/wiki/Xbox_One",
        },
        {
            type: "home",
            raw_orig_price: 200,
            name: "Master System",
            manufacturer: "Sega",
            year: 1986,
            img: "Sega-Master-System-Set",
            link: "https://en.wikipedia.org/wiki/Master_System",
        },
        {
            type: "home",
            raw_orig_price: 189,
            name: "Sega Genesis",
            manufacturer: "Sega",
            year: 1989,
            img: "Sega-Genesis-Mk2-6button",
            link: "https://en.wikipedia.org/wiki/Sega_Genesis",
        },
        {
            type: "home",
            raw_orig_price: 399,
            name: "Sega Saturn",
            manufacturer: "Sega",
            year: 1995,
            img: "Sega-Saturn-Console-Set-Mk1",
            link: "https://en.wikipedia.org/wiki/Sega_Saturn",
        },
        {
            type: "home",
            raw_orig_price: 199,
            name: "DreamCast",
            manufacturer: "Sega",
            year: 1999,
            img: "Dreamcast-Console-Set",
            link: "https://en.wikipedia.org/wiki/Dreamcast",
        },
        {
            type: "home",
            raw_orig_price: 199,
            name: "Atari 2600",
            manufacturer: "Atari",
            year: 1977,
            img: "Atari-2600-Wood-4Sw-Set",
            link: "https://en.wikipedia.org/wiki/Atari_2600",
        },
        {
            type: "home",
            raw_orig_price: 269,
            name: "Atari 5200",
            manufacturer: "Atari",
            year: 1982,
            img: "Atari-5200-4-Port-wController-L",
            link: "https://en.wikipedia.org/wiki/Atari_5200",
        },
        {
            type: "home",
            raw_orig_price: 139,
            name: "Atari 7800",
            manufacturer: "Atari",
            year: 1986,
            img: "Atari-7800-Console-Set",
            link: "https://en.wikipedia.org/wiki/Atari_7800",
        },
        {
            type: "home",
            raw_orig_price: 249,
            name: "Atari Jaguar",
            manufacturer: "Atari",
            year: 1993,
            img: "Atari-Jaguar-Console-Set",
            link: "https://en.wikipedia.org/wiki/Atari_Jaguar",
        },
        {
            type: "home",
            raw_orig_price: 299,
            name: "Intellivision",
            manufacturer: "Mattel",
            year: 1979,
            img: "Intellivision-Console-Set",
            link: "https://en.wikipedia.org/wiki/Intellivision",
        },
        {
            type: "home",
            raw_orig_price: 175,
            name: "ColecoVision",
            manufacturer: "Coleco",
            year: 1982,
            img: "ColecoVision-wController-L",
            link: "https://en.wikipedia.org/wiki/ColecoVision",
        },
        {
            type: "home",
            raw_orig_price: 199,
            name: "TurboGrafx-16",
            manufacturer: "Hudson Soft & Nec Home Electronics",
            year: 1989,
            img: "TurboGrafx16-Console-Set",
            link: "https://en.wikipedia.org/wiki/TurboGrafx-16",
        },
        {
            type: "home",
            raw_orig_price: 649,
            name: "Neo Geo",
            manufacturer: "SNK",
            year: 1990,
            img: "Neo-Geo-AES-Console-Set",
            link: "https://en.wikipedia.org/wiki/Neo_Geo_(system)",
        },
        {
            type: "home",
            raw_orig_price: 699,
            name: "3DO",
            manufacturer: "3DO",
            year: 1993,
            img: "3DO-FZ1-Console-Set",
            link: "https://en.wikipedia.org/wiki/3DO_Interactive_Multiplayer",
        },
        {
            type: "handheld",
            raw_orig_price: 89,
            name: "Game Boy",
            manufacturer: "Nintendo",
            year: 1989,
            img: "Game-Boy-FL",
            link: "https://en.wikipedia.org/wiki/Game_Boy",
        },
        {
            type: "handheld",
            raw_orig_price: 179,
            name: "Virtual Boy",
            manufacturer: "Nintendo",
            year: 1995,
            img: "Virtual-Boy-Set",
            link: "https://en.wikipedia.org/wiki/Virtual_Boy",
        },
        {
            type: "handheld",
            raw_orig_price: 69,
            name: "Game Boy Color",
            manufacturer: "Nintendo",
            year: 1998,
            img: "Nintendo-Game-Boy-Color-FL",
            link: "https://en.wikipedia.org/wiki/Game_Boy_Color",
        },
        {
            type: "handheld",
            raw_orig_price: 99,
            name: "Game Boy Advance",
            manufacturer: "Nintendo",
            year: 2001,
            img: "Nintendo-Game-Boy-Advance-Purple-FL",
            link: "https://en.wikipedia.org/wiki/Game_Boy_Advance",
        },
        {
            type: "handheld",
            raw_orig_price: 149,
            name: "Nintendo DS",
            manufacturer: "Nintendo",
            year: 2004,
            img: "Nintendo-DS-Lite-Black-Open",
            link: "https://en.wikipedia.org/wiki/Nintendo_ds",
        },
        {
            type: "handheld",
            raw_orig_price: 249,
            name: "Nintendo 3DS",
            manufacturer: "Nintendo",
            year: 2011,
            img: "Nintendo-3DS-AquaOpen",
            link: "https://en.wikipedia.org/wiki/3ds",
        },
        {
            type: "handheld",
            raw_orig_price: 249,
            name: "PSP",
            manufacturer: "Sony",
            year: 2005,
            img: "Psp-1000",
            link: "https://en.wikipedia.org/wiki/PlayStation_Portable",
        },
        {
            type: "handheld",
            raw_orig_price: 249,
            name: "Playstation Vita",
            manufacturer: "Sony",
            year: 2012,
            img: "PlayStation-Vita-1101-FL",
            link: "https://en.wikipedia.org/wiki/PlayStation_Vita",
        },
        {
            type: "handheld",
            raw_orig_price: 179,
            name: "Atari Lynx",
            manufacturer: "Atari",
            year: 1989,
            img: "Atari-Lynx-Handheld-Angled",
            link: "https://en.wikipedia.org/wiki/Atari_Lynx",
        },
        {
            type: "handheld",
            raw_orig_price: 149,
            name: "Sega Game Gear",
            manufacturer: "Sega",
            year: 1991,
            img: "Game-Gear-Handheld",
            link: "https://en.wikipedia.org/wiki/Game_gear",
        },
        {
            type: "handheld",
            raw_orig_price: 180,
            name: "Sega Nomad",
            manufacturer: "Sega",
            year: 1995,
            img: "Sega-Nomad-Front",
            link: "https://en.wikipedia.org/wiki/Sega_Nomad",
        },
        {
            type: "handheld",
            raw_orig_price: 249,
            name: "TurboExpress",
            manufacturer: "NEC",
            year: 1990,
            img: "NEC-TurboExpress-Upright-FL",
            link: "https://en.wikipedia.org/wiki/TurboExpress",
        },
        {
            type: "handheld",
            raw_orig_price: 69,
            name: "Game.com",
            manufacturer: "Tiger",
            year: 1997,
            img: "Tiger-Game-Com-FL",
            link: "https://en.wikipedia.org/wiki/Game.com",
        },
        {
            type: "handheld",
            raw_orig_price: 69,
            name: "Neo Geo Pocket",
            manufacturer: "SNK",
            year: 1999,
            img: "Neo-Geo-Pocket-Anthra-Left",
            link: "https://en.wikipedia.org/wiki/NeoGeo_Pocket",
        },
        /*
        Appears to have been Japan only
        {
            type: "handheld",
            raw_orig_price: ???,
            name: "WonderSwan",
            manufacturer: "Bandai",
            year: 1999,
            img: "",
            link: "",
        },
        */
        {
            type: "handheld",
            raw_orig_price: 299,
            name: "N-Gage",
            manufacturer: "Nokia",
            year: 2003,
            img: "Nokia-NGage-LL",
            link: "https://en.wikipedia.org/wiki/N-Gage_(device)",
        }
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
    data.raw_price = Math.round(inflation(data.year, data.raw_orig_price, DATA.inflation_year, DATA.inflation_month));
    data.price = data.raw_price.toLocaleString();
    data.orig_price = data.raw_orig_price.toLocaleString()

    data.img200Webp = "gen/img/" + data.img + "-200.webp";
    data.img400Webp = "gen/img/" + data.img + "-400.webp";
    data.img600Webp = "gen/img/" + data.img + "-600.webp";
    data.img800Webp = "gen/img/" + data.img + "-800.webp";
    data.img1600Webp = "gen/img/" + data.img + "-1600.webp";
    data.img200Jpeg = "gen/img/" + data.img + "-200.jpg";
    data.img400Jpeg = "gen/img/" + data.img + "-400.jpg";
    data.img600Jpeg = "gen/img/" + data.img + "-600.jpg";
    data.img800Jpeg = "gen/img/" + data.img + "-800.jpg";
    data.img1600Jpeg = "gen/img/" + data.img + "-1600.jpg";
}

async function main() {
    let templateResult = await templater("index.hbs", DATA, destDir, devMode);

    if (process.argv[2] == "upload") {
        const BUCKET = "www.inflationstation.net";

        AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'personal-account'});

        let s3 = new AWS.S3();
        for (f of await util.promisify(glob)("**", {nodir: true, cwd: "dist"})) {

            let doUpload = false;
            if (f.endsWith("index.html") || f.endsWith("favicon.ico")) {
                doUpload = true;
            } else {
                try {
                    await s3.headObject({Bucket: BUCKET, Key: f}).promise();
                } catch (err) {
                    if (err.code === "NotFound") {
                        doUpload = true;
                    } else {
                        throw err;
                    }
                }
            }

            let contentType;
            let cacheControl;
            if (f.endsWith("html")) {
                contentType = "text/html";
                cacheControl = "max-age=600";
                let styleHashes = templateResult.inlineStyleHashses.map((x) => "'sha256-" + x + "'").join(" ");
                let scriptHashes = templateResult.inlineScriptHashses.map((x) => "'sha256-" + x + "'").join(" ");
                meta = {
                    "Content-Security-Policy": "default-src 'self'; img-src 'self' data:; script-src 'self' " + scriptHashes + "; style-src 'self' " + styleHashes,
                    "X-Content-Type-Options": "nosniff",
                    "X-Frame-Options": "DENY",
                    "X-XSS-Protection": "1; mode=block",
                };
            } else if (f.endsWith(".ico")) {
                contentType = "image/vnd.microsoft.icon";
                cacheControl = "max-age=86400";
                meta = {};
            } else if (f.endsWith(".jpg")) {
                contentType = "image/jpeg";
                cacheControl = "max-age=31536000";
                meta = {};
            } else if (f.endsWith(".webp")) {
                contentType = "image/webp";
                cacheControl = "max-age=31536000";
                meta = {};
            } else if (f.endsWith(".js")) {
                contentType = "application/javascript";
                cacheControl = "max-age=31536000";
                meta = {};
            } else if (f.endsWith(".css")) {
                contentType = "text/css";
                cacheControl = "max-age=31536000";
                meta = {};
            } else {
                throw "Can't figure out content type or cache-control";
            }

            if (doUpload) {
                console.log("Uploading: " + f);
                await s3.putObject({
                    Body: await readFile(path.join("dist", f)),
                    Bucket: BUCKET, 
                    Key: f,
                    CacheControl: cacheControl,
                    ContentType: contentType,
                    Metadata: meta,
                }).promise();
            } else {
                console.log("Already uploaded: " + f);
            }
        }
    }
}

main().catch((err) => console.log(err));