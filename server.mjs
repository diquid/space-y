import * as path from "path";
import fs from "fs";
import express from "express";
import https from "https";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const rootDir = process.cwd();
const port = 3000;
const app = express();

//1
app.use('/', express.static('spa/build'));

app.get("/client.mjs", (_, res) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.sendFile(path.join(rootDir, "client.mjs"), {
    maxAge: -1,
    cacheControl: false,
  });
});

/*app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});*/

//2
app.get("/*", (req, res) => {
  res.sendFile(path.join(rootDir, 'spa', 'build', 'index.html'));
});

//3
https
    .createServer({
      key: fs.readFileSync("certs/server.key"),
      cert: fs.readFileSync("certs/server.cert"),
    },
     app
    )
    .listen(port, () => {
      console.log(`App listening on port ${port}`);
    });

