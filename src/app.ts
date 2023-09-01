import express from "express";
import cors from "cors";
import db from "./db/index";
import userRouter from "./routers/userRouter";
import doetListRouter from "./routers/doetListRouter";
import doetRouter from "./routers/doetRouter";

const app = express();

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.urlencoded( {extended: true }));
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/doetList", doetListRouter);
app.use("/doet", doetRouter);

export default app;
