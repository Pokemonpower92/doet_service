import { Request, Response, NextFunction } from "express";
import respond from "../helpers/respond";

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    respond.send400("Unauthorized", res);
  }
};
