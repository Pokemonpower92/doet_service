import express from "express";
import User from "../models/user";
import logger from "../logger/logger";
import respond from "./helpers/respond";

const createUser = async (req: express.Request, res: express.Response) => {

    try {
        logger.info(`Recieved request to create new user: ${JSON.stringify(req.body)})`);
        const body = req.body;

        const newUser = await new User(body).save();
        respond.send200(`Successfully created new user: ${newUser._id}`, newUser, res);
    }
    catch (err) {
        respond.send500(`Failed to create new user with error ${err}`, res);
    }
};

const getUsers = async (req: express.Request, res: express.Response) => {
    try {
        logger.info(`Recieved request to get all users`);
        const users = await User.find();

        respond.send200("Successfully found all users", users, res);
    }
    catch (err) {
        respond.send500(`Failed to get all users with err: ${err}`, res);
    }
}

const getUserById = async (req: express.Request, res: express.Response) => {
    try {
        logger.info(`Recieved request to get a user by id: ${req.params.id}`);
        const user = await User.findById(req.params.id);

        if (user === null) {
            respond.send404(`Failed to find user by id: ${req.params.id}`, res);
        }
        else {
            respond.send200(`Sucessfully found user by id: ${req.params.id}`, user, res)
        }
    }
    catch (err) {
        respond.send500(`Failed to find user with error: ${err}`, res);
    }
}

const updateUserById = async (req: express.Request, res: express.Response) => {
    try {
        logger.info(`Recieved request to update a user by id: ${req.params.id}`);
        const user = await User.findByIdAndUpdate(req.params.id, {$set:req.body}, {new: true, runValidators: true});

        if (user === null) {
            respond.send404(`Failed to find user by id: ${req.params.id}`, res);
        }
        else {
            respond.send200(`Sucessfully updated user by id: ${req.params.id}`, user, res)
        }
    }
    catch (err) {
        respond.send500(`Failed to update user with error ${err}`, res);
    }
}

const deleteUserById = async (req: express.Request, res: express.Response) => {
    try {
        logger.info(`Recieved request to delete a user by id: ${req.params.id}`);
        const user = await User.findByIdAndDelete(req.params.id);

        if (user === null) {
            respond.send404(`Failed to find user by id: ${req.params.id}`, res);
        }
        else {
            respond.send200(`Successfully deleted user: ${req.params.id}`, user, res);
        }
    }
    catch (err) {
        respond.send500(`Failed to delete user with err: ${err}`, res);
    }
}

export default {
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById
}