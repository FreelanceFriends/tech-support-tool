const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/db.config");
const logger = require("./logger/api.logger");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors")

dotenv.config();

const userRouter = require("./router/user.router");
const roleRouter = require("./router/role.router");
const ticketRouter = require("./router/ticket.router");
const { checkAuth } = require("./middleware/check-auth.middleware");
const { validateUserSchema } = require("./middleware/validate-user-schema.middleware");

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/api/v1/user", validateUserSchema, userRouter)
app.use("/api/v1/role", checkAuth,roleRouter)
app.use("/api/v1/ticket", checkAuth, ticketRouter)


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

// self invoking function which will wait for db connection
(async () => {
  try {
    await db.connect();
    app.listen(port, () => console.log(`Server is runnning on port: ${port}`));
  } catch (err) {
    logger.error("Db error " + err);
  }
})();
