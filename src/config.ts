import * as process from "process";

export const dbConfig = {
  port: process.env.DB_PORT || "27017",
  host: process.env.HOST || "127.0.0.1",
  database: process.env.DB || "doetDB",
};

const sessionAge = Number(process.env.SESSION_AGE) || 1000 * 60 * 60 * 24 * 7;
export const sessionConfig = {
  secret: process.env.SESSION_SECRET || "devsecret",
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + sessionAge),
    maxAge: sessionAge,
    httpOnly: true,
  },
};

export const APP_PORT = process.env.APP_PORT || 3030;
