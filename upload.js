const path = require('path');
const AWS = require('aws-sdk');
const glob = require('glob');
const util = require("util");
const fs = require("fs");

async function main() {
    const BUCKET = "www.inflationstation.net";

    AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: "personal-account"});
    const s3 = new AWS.S3();

    for (const f of await util.promisify(glob)("**", {nodir: true, cwd: "out"})) {
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
            cacheControl = "public, max-age=300";
            meta = {
                "X-Content-Type-Options": "nosniff",
                "X-Frame-Options": "DENY",
                "X-XSS-Protection": "1; mode=block",
            };
        } else if (f.endsWith(".ico")) {
            contentType = "image/vnd.microsoft.icon";
            cacheControl = "public, max-age=86400";
            meta = {};
        } else if (f.endsWith(".jpg")) {
            contentType = "image/jpeg";
            cacheControl = "public, max-age=31536000, immutable";
            meta = {};
        } else if (f.endsWith(".webp")) {
            contentType = "image/webp";
            cacheControl = "public, max-age=31536000, immutable";
            meta = {};
        } else if (f.endsWith(".js")) {
            contentType = "application/javascript";
            cacheControl = "public, max-age=31536000, immutable";
            meta = {};
        } else if (f.endsWith(".css")) {
            contentType = "text/css";
            cacheControl = "public, max-age=31536000, immutable";
            meta = {};
        } else if (f.endsWith(".json")) {
            contentType = "application/json";
            cacheControl = "public, max-age=31536000, immutable";
            meta = {};
        } else if (f.endsWith(".woff2")) {
            contentType = "font/woff2";
            cacheControl = "public, max-age=31536000, immutable";
            meta = {};
        } else {
            throw new Error(`Can't figure out content type or cache-control for: ${f}`);
        }

        if (doUpload) {
            console.log("Uploading: " + f);
            await s3.putObject({
                Body: await util.promisify(fs.readFile)(path.join("out", f)),
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

main().catch((err) => console.log(err));
