import express from "express";
import { json } from 'body-parser';
import 'express-async-errors'
import { router } from './routes/router'
import cookieSession from "cookie-session";
import { errorHandler } from "./middlewares/ErrorHandler";
import { NotFoundError } from "./errors/NotFoundError";
const cookieParser = require('cookie-parser');

const app = express();
const { PORT } = require("./config");
const { DB_CONNECTION } = require("./config");

app.use(cookieParser());
app.use(json({ limit: '10mb' }));
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.npm_lifecycle_event === "dev"
  })
);
app.use(router);


app.all("*", async (req, res) => {
  throw new NotFoundError('Route not found');
});

//middleware pour attraper les erreurs
app.use(errorHandler);


const start = async () => {
  if (process.env.npm_lifecycle_event === "local" || process.env.npm_lifecycle_event === "test") {
    require('dotenv').config();
  }
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  DB_CONNECTION
    .sync()
    .then(() => {
      console.log("Database successfully connected");
    })
    .catch((err: any) => {
      console.log("Error", err);
    });


  app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
  });
};

start();
export default app;