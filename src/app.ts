import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import User from "./models/user";

import userRouter from "./routers/userRouter";
import doetListRouter from "./routers/doetListRouter";
import doetRouter from "./routers/doetRouter";
import { sessionConfig } from "./config";
import db from "./db";

const app = express();

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

const user: any = User;
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use("/user", userRouter);
app.use("/doetList", doetListRouter);
app.use("/doet", doetRouter);

export default app;
