import express from "express";
import Doet from "../models/doet";
import DoetList from "../models/doetList";
import respond from "../helpers/respond";
import logger from "../logger/logger";

const createDoet = async (req: express.Request, res: express.Response) => {
  try {
    logger.info(
      `Recieved request to create new doet: ${JSON.stringify(req.body)}`,
    );
    const doetList = await DoetList.findById(req.params.doetList_id);

    if (doetList === null) {
      respond.send404(
        `Failed to find doetList: ${req.params.doetList_id}`,
        res,
      );
    } else {
      const newDoet = await new Doet({
        doetList: doetList._id,
        ...req.body,
      }).save();
      doetList.doets.push(newDoet._id);
      doetList.save();

      if (newDoet === null) {
        respond.send404("Failed to create new doet", res);
      } else {
        respond.send200(
          `Successfully created new doet: ${newDoet._id}`,
          newDoet,
          res,
        );
      }
    }
  } catch (err) {
    respond.send404(`Failed to create new doet with error: ${err}`, res);
  }
};

const getDoetById = async (req: express.Request, res: express.Response) => {
  try {
    logger.info(`Recieved request to get doet by id: ${req.params.id}`);
    const doet = await Doet.findById(req.params.id);

    if (doet === null) {
      respond.send404(`Failed to find doet: ${req.params.id}`, res);
    } else {
      respond.send200(`Successfully found doet: ${req.params.id}`, doet, res);
    }
  } catch (err) {
    respond.send500(`Failed to find doet with error: ${err}`, res);
  }
};

const updateDoetById = async (req: express.Request, res: express.Response) => {
  try {
    logger.info(`Recieved request to update doet by id: ${req.params.id}`);
    const doet = await Doet.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true },
    );

    if (doet === null) {
      respond.send404(`Failed to find doet: ${req.params.id}`, res);
    } else {
      respond.send200(`Successfully updated doet: ${req.params.id}`, doet, res);
    }
  } catch (err) {
    respond.send500(`Failed to updsate doet with error: ${err}`, res);
  }
};

const deleteDoetById = async (req: express.Request, res: express.Response) => {
  try {
    logger.info(`Recieved request to delete doet: ${req.params.id}`);
    const doet = await Doet.findByIdAndDelete(req.params.id);

    if (doet === null) {
      respond.send404(`Failed to get doet: ${req.params.id}`, res);
    } else {
      respond.send200(`Successfully deleted doet: ${doet._id}`, doet, res);
    }
  } catch (err) {
    respond.send500(`Failed to delete doet with error: ${err}`, res);
  }
};

export default {
  createDoet,
  getDoetById,
  updateDoetById,
  deleteDoetById,
};
