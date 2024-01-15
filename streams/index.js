import express from "express";
import fs from "fs";
import zlib from "zlib";
import status from "express-status-monitor";

const app = express();
const PORT = 4000;

app.use(status());

// zip file: stream read(text file) -> zipper -> fs write (zip file) stream
fs.createReadStream(`${process.cwd()}/streams/public/text.txt`).pipe(
    zlib
        .createGzip()
        .pipe(fs.createWriteStream(`${process.cwd()}/streams/public/text.zip`))
);

app.get("/", (req, res) => {
    // @problem: This will not return response until the file is read completely and stored in memory.
    // fs.readFile(`${process.cwd()}/streams/public/text.txt`, (error, data) => {
    //     res.end(data);
    // });

    // @Solution: use Streams
    const stream = fs.createReadStream(
        `${process.cwd()}/streams/public/text.txt`,
        "utf-8"
    );
    stream.on("data", (chunk) => res.write(chunk));
    stream.on("end", () => res.end());
});

app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}/`);
});
