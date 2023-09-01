import app from "./app";
import logger from "./logger/logger";

app.listen(3030, () => {
    logger.info("Listening on port 3030");
})