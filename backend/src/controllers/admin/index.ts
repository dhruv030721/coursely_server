import express from "express";
import { adminMiddleware, authMiddleware } from "../../middlewares";
import { createDiscount, getDiscount, removeDiscount } from "./discount";

const adminRouter = express.Router();

// Discount Routes
adminRouter.post("/discount", authMiddleware, adminMiddleware, createDiscount)
adminRouter.get("/discount", getDiscount)
adminRouter.delete("/discount", authMiddleware, adminMiddleware, removeDiscount)


export default adminRouter;