import express from "express";
import { adminMiddleware, authMiddleware } from "../../middlewares";
import {
  createDiscount,
  getDiscount,
  removeDiscount,
  verifyDiscount,
  updateDiscount,
} from "./discount";

import { getUser } from "./user";
const adminRouter = express.Router();

// ----------------------------------Discount Routes----------------------------------
adminRouter.post("/discount", authMiddleware, adminMiddleware, createDiscount);
adminRouter.get("/discount", getDiscount);
adminRouter.delete(
  "/discount",
  authMiddleware,
  adminMiddleware,
  removeDiscount
);
adminRouter.get(
  "/discount/verify",
  authMiddleware,
  adminMiddleware,
  verifyDiscount
);
adminRouter.put("/discount", authMiddleware, adminMiddleware, updateDiscount);

// ----------------------------------User Routes----------------------------------
adminRouter.get("/get_users", authMiddleware, adminMiddleware, getUser);

export default adminRouter;
