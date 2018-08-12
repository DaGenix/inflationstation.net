const fs = require('fs');
const glob = require('glob');
const crypto = require('crypto');
const path = require('path');

const Purgecss = require("purgecss");
const purgeHtml = require("purgecss-from-html");

const SOURCE = "out";
const DEST = "dist";

if (!fs.existsSync("dist")) {
    fs.mkdirSync("dist");
}

let html = fs.readFileSync(path.join(SOURCE, "index.html"), {encoding: "utf-8"});

const input_files = glob.sync("img/*", {cwd: SOURCE}).concat(glob.sync("css/*", {cwd: SOURCE})).concat(glob.sync("js/*", {cwd: SOURCE}));
for (file of input_files) {
    const p = path.parse(file);

    const file_data = fs.readFileSync(path.join(SOURCE, file));
    const digest = crypto.createHash("sha256").update(file_data).digest("hex");

    const name_with_hash = p.name + "-" + digest + p.ext;

    while (true) {
        const old_html = html;
        html = html.replace(p.base, name_with_hash);
        if (html === old_html) {
            break;
        }
    }

    if (!fs.existsSync(path.join(DEST, p.dir))) {
        fs.mkdirSync(path.join(DEST, p.dir));
    }
    fs.copyFileSync(path.join(SOURCE, file), path.join(DEST, p.dir, name_with_hash));
}

const cssContent = new Purgecss({
    content: [path.join(SOURCE, "index.html")],
    css: [SOURCE + "/css/*.css"],
    extractors: [
        {
            extractor: purgeHtml,
            extensions: ["html"]
        }
    ]
}).purge();
const cssDigest = crypto.createHash("sha256").update(cssContent).digest("hex");
fs.writeFileSync(path.join(DEST, "css", "style-" + cssDigest + ".css"), cssContent, {encoding: "utf-8"});

fs.copyFileSync(path.join(SOURCE, "favicon.ico"), path.join(DEST, "favicon.ico"))

fs.writeFileSync(path.join(DEST, "index.html"), html, {encoding: "utf-8"});
