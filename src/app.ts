import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import globalErrorHandler from "./middlewares/globalErrorHandlers";
const app = express();

// routes

app.get("/", (req, res) => {
  res.json({ message: "Helloworld" });
});

app.use(globalErrorHandler);

export default app;
