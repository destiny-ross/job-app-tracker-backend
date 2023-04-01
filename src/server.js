import express from "express";
import https from "https";
import fs from "fs";

const PORT = 4000;

const app = express();

app.use(express.json());
app.use("*", (_req, res) => {
  return res.status(200).send(`<h1>Hello World</h1>`);
});

const start = () => {
  try {
    https
      .createServer(
        {
          key: fs.readFileSync("localhost+2-key.pem"),
          cert: fs.readFileSync("localhost+2.pem"),
        },
        app
      )
      .listen(PORT, function () {
        console.info(`Server listening on https://localhost:${PORT}`);
      });

    process.on("uncaughtException", (err) => {
      console.error(err);
      process.exit(1);
    });

    process.on("unhandledRejection", (err) => {
      console.error(err);
      process.exit(1);
    });
  } catch (e) {
    console.error(e);
  }
};

export default start;
