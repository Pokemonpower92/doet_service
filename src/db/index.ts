import mongoose from "mongoose";
import { dbENV } from "../config/env";
import logger from "../logger/logger";

const uri = `mongodb://${dbENV.host}:${dbENV.port}/${dbENV.database}`;

mongoose
    .connect(uri)
    .then(() => {
        logger.info(`CONNECTION ESTABLISHED TO ${dbENV.database}`);
    })
    .catch((err) => {
        logger.info(`ERROR CONNECTING TO ${dbENV.database}`);
        logger.info(err);
    });

const db = mongoose.connection;

export default db;