const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/db.config");
const dotenv = require("dotenv");
const path = require("path");

var app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/health", (req, res) => {
  res.send({ message: "Hello Nodejs!!" });
});

__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Hello I'm Technical Support Ticketing Master!!");
  });
}

const port = process.env.APP__PORT || 8080;
(async () => {
  try {
    await db.connect();
    app.listen(port, () => console.log(`Server is runnning on port: ${port}`));
  } catch (err) {
    logger.error("Db error " + err);
  }
})();
