import express from "express";
import { adminMiddleware } from "../../middlewares";
import { createDiscount } from "./discount";

const adminRouter = express.Router();

// Discount Routes
adminRouter.get("/discount", adminMiddleware, createDiscount)



export default adminRouter;