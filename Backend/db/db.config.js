const mongoose = require("mongoose");
const logger = require("../logger/api.logger");

class DbConfig {
  constructor() {
    this.db = null;
  }

  getDb() {
    return this.db;
  }

  async connect() {
    const uri = process.env.MONGO_CONNECTION_STRING;

    if (!uri) {
      logger.error(
        "Attempt to DB connect not happened. Mongo URI is not available"
      );
      return;
    }
    try {
      mongoose.set("strictQuery", false);
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

        //   useCreateIndex: true,
        //   useFindAndModify: true,
      });
      logger.info("Database connection established !!!");
      this.db = mongoose.connection.db;
    } catch (err) {
      logger.error(`Database connection failed::: ${err}`);
      throw Error(err);
    }

    mongoose.connection.on("error", (err) => {
      logger.error(`Database connection failed::: ${err}`);
      throw Error("Data connection failed");
    });
  }

  disconnect() {
    if (!mongoose.connection) {
      return;
    }

    mongoose.disconnect();

    mongoose.once("close", async () => {
      logger.info("Database connection closed");
    });
  }
}

module.exports = new DbConfig();
