import express from "express";
import {
  adminMiddleware,
  authMiddleware,
  convertToWebp,
  upload,
} from "../../middlewares";
import {
  createDiscount,
  getDiscount,
  removeDiscount,
  verifyDiscount,
  updateDiscount,
} from "./discount";
import { createCourse, getCourse } from "./course";

import { getUser } from "./user";
const adminRouter = express.Router();

// ----------------------------------Course Routes----------------------------------
adminRouter.post(
  "/course",
  authMiddleware,
  adminMiddleware,
  upload.single("thumbnail"),
  convertToWebp,
  createCourse
);
adminRouter.get("/course", getCourse);

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
