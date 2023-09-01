import express from "express";
import userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/", userController.createUser);
userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.put("/:id", userController.updateUserById);
userRouter.delete("/:id", userController.deleteUserById);

export default userRouter;