import app from "./app";
import { APP_PORT } from "./config";
import logger from "./logger/logger";

app.listen(APP_PORT, () => {
  logger.info(`Listening on port ${APP_PORT}`);
});
