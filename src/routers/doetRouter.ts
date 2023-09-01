import express from "express";
import doetController from "../controllers/doetController";

const doetRouter = express.Router();

doetRouter.post("/doetList/:doetList_id", doetController.createDoet);
doetRouter.get("/:id", doetController.getDoetById);
doetRouter.put("/:id", doetController.updateDoetById);
doetRouter.delete("/:id", doetController.deleteDoetById);

export default doetRouter;
