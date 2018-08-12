const Handlebars = require("handlebars");
const fs = require('fs');
const path = require('path');
const process = require('process');
const util = require('util');
const uncss = util.promisify(require("uncss"));
const crypto = require("crypto");
const UglifyJS = require("uglify-js");
const htmlMinify = require('html-minifier').minify;


const mkdir = util.promisify(fs.mkdir);
const copyFile = util.promisify(fs.copyFile);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const unlink = util.promisify(fs.unlink);

async function myCopyFile(source, dest, devMode) {
    let p = path.parse(dest);
    if (!devMode) {
        let hash = crypto.createHash("sha256").update(await readFile(source)).digest("hex");
        dest = path.join(p.dir, p.name + "-" + hash + p.ext);
    }
    try {
        await copyFile(source, dest, fs.constants.COPYFILE_FICLONE);
    } catch (err) {
        if (err.code == 'EEXIST') {
            await unlink(dest);
            await copyFile(source, dest, fs.constants.COPYFILE_FICLONE);
        } else {
            throw err;
        }
    }
    return path.basename(dest);
}

async function myWriteFile(dest, data, devMode) {
    let p = path.parse(dest);
    if (!devMode) {
        let hash = crypto.createHash("sha256").update(data).digest("hex");
        dest = path.join(p.dir, p.name + "-" + hash + p.ext);
    }
    await writeFile(dest, data);
    return path.basename(dest);
}

function uglify(code) {
    let u = UglifyJS.minify(code);
    if (u.error) {
        throw u.error;
    } else {
        return u.code;
    }
}

function findDeps(basePath, template, context) {
    let hb = Handlebars.create();

    let result = {
        inlineStyles: [],
        styles: [],
        images: [],
        inlineScripts: [],
        scripts: [],
        bareHtml: null,
    }

    hb.registerHelper("inlineStyles", function() {
        let s = [];
        for (let i=0; i<arguments.length - 1; i++) {
            s.push(path.resolve(basePath, arguments[i]));
        }
        result.inlineStyles.push(s);
        return "";
    });
    hb.registerHelper("styles", function() {
        let s = [];
        for (let i=0; i<arguments.length - 1; i++) {
            s.push(path.resolve(basePath, arguments[i]));
        }
        result.styles.push(s);
        return "";
    });
    hb.registerHelper("imgName", function(imgName) {
        result.images.push(path.resolve(basePath, imgName));
        return "FAKE-IMG.png";
    });
    hb.registerHelper("inlineScripts", function() {
        let s = [];
        for (let i=0; i<arguments.length - 1; i++) {
            s.push(path.resolve(basePath, arguments[i]));
        }
        result.inlineScripts.push(s);
        return "";
    });
    hb.registerHelper("scripts", function() {
        let s = [];
        for (let i=0; i<arguments.length - 1; i++) {
            s.push(path.resolve(basePath, arguments[i]));
        }
        result.scripts.push(s);
        return "";
    });

    result.inlineStyles.reverse();
    result.styles.reverse();
    result.inlineScripts.reverse();
    result.scripts.reverse();

    result.images = result.images.sort().filter((val, index, arr) => {
        return index == 0 || val != arr[index - 1];
    })

    result.bareHtml = hb.compile(template)(context);

    return result;
}

async function processDeps(dest, devMode, deps) {
    let depMap = {
        inlineStyles: [],
        styles: [],
        images: {},
        inlineScripts: [],
        scripts: [],
    };

    if (devMode) {
        for (helperArgs of deps.inlineStyles) {
            let buffer = []
            for (s of helperArgs) {
                buffer.push(await readFile(s, {encoding: "utf-8"}));
            }
            depMap.inlineStyles.push(buffer.join(""));
        }
    } else {
        for (helperArgs of deps.inlineStyles) {
            let buffer = []
            for (s of helperArgs) {
                buffer.push(await readFile(s, {encoding: "utf-8"}));
            }
            // TODO: Ignoring this specific selector is a bit of a HACK
            let result = await uncss(deps.bareHtml, {raw: buffer.join(""), ignore: [".d-none"]});
            depMap.inlineStyles.push(result);
        }
    }

    for (helperArgs of deps.styles) {
        let buffer = []
        for (s of helperArgs) {
            let destPath = path.join(dest, "css", path.basename(s));
            fn = await myCopyFile(s, destPath, devMode);
            buffer.push("css/" + fn);
        }
        depMap.styles.push(buffer);
    }

    for (img of deps.images) {
        let destPath = path.join(dest, "img", path.basename(img));
        fn = await myCopyFile(img, destPath, devMode);
        depMap.images[img] = "img/" + fn; 
    }
        
    for (helperArgs of deps.inlineScripts) {
        let buffer = []
        for (s of helperArgs) {
            buffer.push(await readFile(s, {encoding: "utf-8"}));
        }
        if (devMode) {
            depMap.inlineScripts.push(buffer.join("\n"));
        } else {
            depMap.inlineScripts.push(uglify(buffer.join("\n")));
        }
    }

    for (helperArgs of deps.scripts) {
        let buffer = []
        for (s of helperArgs) {
            let destPath = path.join(dest, "js", path.basename(s));
            if (devMode) {
                fn = await myCopyFile(s, destPath, devMode);
            } else {
                fn = await myWriteFile(destPath, uglify(await readFile(s, {encoding: "utf-8"})), devMode);
            }
            buffer.push("js/" + fn);
        }
        depMap.scripts.push(buffer);
    }

    return depMap;
}

function buildHtml(basePath, template, context, depMap) {
    let hb = Handlebars.create();
    let inlineStyleHashes = [], inlineScriptHashes = [];

    hb.registerHelper("inlineStyles", function() {
        let s = depMap.inlineStyles.pop();
        let content = hb.escapeExpression(s);
        content = content.trim();
        inlineStyleHashes.push(crypto.createHash("sha256").update(content).digest("base64"));
        return new hb.SafeString("<style>" + content + "</style>");
    });
    hb.registerHelper("styles", function() {
        let buffer = [];
        for (s of depMap.styles.pop()) {
            buffer.push('<link rel="stylesheet" type="text/css" href="' + hb.escapeExpression(s) + '">')
        }
        return new hb.SafeString(buffer.join(""));
    });
    hb.registerHelper("imgName", function(img) {
        return depMap.images[path.resolve(basePath, img)];
    });
    hb.registerHelper("inlineScripts", function() {
        let content = depMap.inlineScripts.pop();
        content = content.replace(/<\!--/g, "<\\!--");
        content = content.replace(/<script/g, "<\\script");
        content = content.replace(/<\/script/g, "<\\/script");
        content = content.trim();
        inlineScriptHashes.push(crypto.createHash("sha256").update(content).digest("base64"));
        return new hb.SafeString("<script>" + content + "</script>");
    });
    hb.registerHelper("scripts", function() {
        let buffer = [];
        for (s of depMap.scripts.pop()) {
            buffer.push('<script async src="' + hb.escapeExpression(s) + '"></script>')
        }
        return new hb.SafeString(buffer.join(""));
    });

    return {
        html: hb.compile(template)(context),
        inlineStyleHashses: inlineStyleHashes,
        inlineScriptHashses: inlineScriptHashes,
    };
}

module.exports = async function(templatePath, context, dest, devMode=true) {
    let basePath = path.resolve(process.cwd(), path.dirname(templatePath));
    let template = await readFile(templatePath, {encoding: "utf-8"});

    try { await mkdir(dest); } catch(error) { }
    try { await mkdir(path.join(dest, "img")); } catch(error) { }
    try { await mkdir(path.join(dest, "css")); } catch(error) { }
    try { await mkdir(path.join(dest, "js")); } catch(error) { }

    let deps = findDeps(basePath, template, context);
    let depMap = await processDeps(dest, devMode, deps);
    let result = buildHtml(basePath, template, context, depMap);

    if (!devMode) {
        result.html = htmlMinify(result.html, {
            removeComments: true,
            collapseWhitespace: true,});
    }
    await writeFile(path.join(dest, "index.html"), result.html);

    return result;
}
