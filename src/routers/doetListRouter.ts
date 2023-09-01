import express from "express";
import doetListController from "../controllers/doetListController";

const doetListRouter = express.Router();

doetListRouter.get("/:id", doetListController.getDoetListById);
doetListRouter.post("/user/:user_id", doetListController.createDoetList);
doetListRouter.put("/:id", doetListController.updateDoetList);
doetListRouter.delete("/:id", doetListController.deleteDoetList);

export default doetListRouter;