import mongoose from "mongoose";
import { dbConfig } from "../config";
import logger from "../logger/logger";

const uri = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;

mongoose
  .connect(uri)
  .then(() => {
    logger.info(`CONNECTION ESTABLISHED TO ${dbConfig.database}`);
  })
  .catch((err) => {
    logger.info(`ERROR CONNECTING TO ${dbConfig.database}`);
    logger.info(err);
  });

const db = mongoose.connection;

export default db;
