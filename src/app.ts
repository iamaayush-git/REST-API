import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import globalErrorHandler from "./middlewares/globalErrorHandlers";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";
const app = express();
app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.json({ message: "Helloworld" });
});

app.use("/api/users", userRouter);
app.use("/api/book", bookRouter);

app.use(globalErrorHandler);

export default app;
