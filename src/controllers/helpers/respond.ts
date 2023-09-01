import express from "express";
import logger from "../../logger/logger";


const send500 = (message: string, res: express.Response) => {
    logger.error(message);
    res.status(500).send({
        status: 500,
        error: message
    })
}

const send404 = (message: string, res: express.Response) => {
    logger.error(message);
    res.status(404).send({
        status: 404,
        error: message
    })
}

const send200 = (message: string, data: object, res: express.Response) => {
    logger.info(message);
    res.status(200).send({
        status: 200,
        data
    });
}

export default {
    send500,
    send404,
    send200
};