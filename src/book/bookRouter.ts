import express from "express";
import { createBook } from "./bookController";
import multer from "multer";
import path from "path";

const bookRouter = express.Router();

const upload = multer({
  dest: path.join(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 3e7 }, //30mb
});

bookRouter.post(
  "/create",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);

export default bookRouter;
