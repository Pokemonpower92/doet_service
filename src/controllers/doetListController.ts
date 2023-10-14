import express from "express";

import logger from "../logger/logger";
import User from "../models/user";
import DoetList from "../models/doetList";
import respond from "../helpers/respond";

const createDoetList = async (req: express.Request, res: express.Response) => {
  try {
    logger.info(
      `Received request to create doetList: ${JSON.stringify(
        req.body,
      )} for user: ${req.params.user_id}`,
    );
    const user = await User.findById(req.params.user_id);

    if (user === null) {
      respond.send404(`Failed to find user: ${req.params.user_id}`, res);
    } else {
      const newDoetList = await new DoetList({
        user: user._id,
        ...req.body,
      }).save();
      user.doetLists.push(newDoetList._id);
      await user.save();

      respond.send200(
        `Successfully created new doetList: ${newDoetList._id}`,
        newDoetList,
        res,
      );
    }
  } catch (err) {
    respond.send500(`Failed to create doetList with error: ${err}`, res);
  }
};

const getDoetListById = async (req: express.Request, res: express.Response) => {
  try {
    logger.info(`Received request to get doetList: ${req.params.id}`);
    const doetList = await DoetList.findById(req.params.id);

    if (doetList === null) {
      respond.send404(`Failed to get doetList: ${req.params.id}`, res);
    } else {
      respond.send200(
        `Successfully found doetList: ${doetList._id}`,
        doetList,
        res,
      );
    }
  } catch (err) {
    respond.send500(`Failed to get doetList with error: ${err}`, res);
  }
};

const updateDoetList = async (req: express.Request, res: express.Response) => {
  try {
    logger.info(`Received request to update doetList: ${req.params.id}`);
    const doetList = await DoetList.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true },
    );

    if (doetList === null) {
      respond.send404(`Failed to get doetList: ${req.params.id}`, res);
    } else {
      respond.send200(
        `Successfully updated doetList: ${doetList._id}`,
        doetList,
        res,
      );
    }
  } catch (err) {
    respond.send500(`Failed to update doetList with error: ${err}`, res);
  }
};

const deleteDoetList = async (req: express.Request, res: express.Response) => {
  try {
    logger.info(`Received request to delete doetList: ${req.params.id}`);
    const doetList = await DoetList.findByIdAndDelete(req.params.id);

    if (doetList === null) {
      respond.send404(`Failed to get doetList: ${req.params.id}`, res);
    } else {
      respond.send200(
        `Successfully deleted doetList: ${doetList._id}`,
        doetList,
        res,
      );
    }
  } catch (err) {
    respond.send500(`Failed to delete doetList with error: ${err}`, res);
  }
};

export default {
  createDoetList,
  getDoetListById,
  updateDoetList,
  deleteDoetList,
};
