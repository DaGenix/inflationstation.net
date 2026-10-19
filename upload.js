const path = require('path');
const {S3Client, HeadObjectCommand, PutObjectCommand} = require("@aws-sdk/client-s3");
const {fromIni} = require("@aws-sdk/credential-providers");
const {glob} = require('glob');
const util = require("util");
const fs = require("fs");

async function main() {
    const BUCKET = "www.inflationstation.net";

    const s3 = new S3Client({
        region: "us-east-1",
        credentials: fromIni({profile: "personal"}),
    });

    for (const f of await glob("**", {nodir: true, cwd: "out"})) {
        let doUpload = false;
        if (f.endsWith("index.html") || f.endsWith("favicon.ico")) {
            doUpload = true;
        } else if (f.endsWith(".txt")) {
            doUpload = false;
        } else {
            try {
                await s3.send(new HeadObjectCommand({Bucket: BUCKET, Key: f}));
            } catch (err) {
                if (err.name === "NotFound" || err.$metadata?.httpStatusCode === 404) {
                    doUpload = true;
                } else {
                    throw err;
                }
            }
        }

        if (doUpload) {
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
            } else if (f.endsWith(".avif")) {
                contentType = "image/avif";
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

            console.log("Uploading: " + f);
            await s3.send(new PutObjectCommand({
                Body: await util.promisify(fs.readFile)(path.join("out", f)),
                Bucket: BUCKET,
                Key: f,
                CacheControl: cacheControl,
                ContentType: contentType,
                Metadata: meta,
            }));
        } else {
            console.log("Already uploaded (or ignored): " + f);
        }
    }
}

main().catch((err) => console.log(err));
