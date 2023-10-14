import express from "express";
import User from "../models/user";
import logger from "../logger/logger";
import respond from "../helpers/respond";

const registerUser = async (req: express.Request, res: express.Response) => {
  try {
    logger.info("Received request to register new user");
    const body = req.body;

    const newUser = new User(body);
    const user: any = User;
    await user.register(newUser, body.password);

    respond.send200(
      `Successfully registered new user with id: ${newUser._id}`,
      newUser,
      res,
    );
  } catch (err) {
    respond.send500(`Failed to register new user with error ${err}`, res);
  }
};

const getUsers = async (req: express.Request, res: express.Response) => {
  try {
    logger.info(`Received request to get all users`);
    const users = await User.find();

    respond.send200("Successfully found all users", users, res);
  } catch (err) {
    respond.send500(`Failed to get all users with err: ${err}`, res);
  }
};

const getUserById = async (req: express.Request, res: express.Response) => {
  try {
    logger.info(`Received request to get a user by id: ${req.params.id}`);
    const user = await User.findById(req.params.id);

    if (user === null) {
      respond.send404(`Failed to find user by id: ${req.params.id}`, res);
    } else {
      respond.send200(
        `Sucessfully found user by id: ${req.params.id}`,
        user,
        res,
      );
    }
  } catch (err) {
    respond.send500(`Failed to find user with error: ${err}`, res);
  }
};

const updateUserById = async (req: express.Request, res: express.Response) => {
  try {
    logger.info(`Received request to update a user by id: ${req.params.id}`);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true },
    );

    if (user === null) {
      respond.send404(`Failed to find user by id: ${req.params.id}`, res);
    } else {
      respond.send200(
        `Successfully updated user by id: ${req.params.id}`,
        user,
        res,
      );
    }
  } catch (err) {
    respond.send500(`Failed to update user with error ${err}`, res);
  }
};

const deleteUserById = async (req: express.Request, res: express.Response) => {
  try {
    logger.info(`Received request to delete a user by id: ${req.params.id}`);
    const user = await User.findByIdAndDelete(req.params.id);

    if (user === null) {
      respond.send404(`Failed to find user by id: ${req.params.id}`, res);
    } else {
      respond.send200(`Successfully deleted user: ${req.params.id}`, user, res);
    }
  } catch (err) {
    respond.send500(`Failed to delete user with err: ${err}`, res);
  }
};

export default {
  registerUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
