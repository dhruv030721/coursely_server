import express from "express";
import { adminMiddleware, authMiddleware, convertToWebp, upload } from "../../middlewares";
import { createDiscount, getDiscount, getDiscounts, removeDiscount, updateDiscount } from "./discount";
import { createCourse, getCourse, createSection, publishCourse, getSingleCourse, updateCourse, deleteCourse } from "./course";
import getUserQueries from "./getUserQueries.controller";
import getUsersController from "./getUsers.controller";

const adminRouter = express.Router();

// ---------------------------------- Course Routes --------------------------------
adminRouter.post("/course", authMiddleware, adminMiddleware, upload.single("thumbnail"), convertToWebp, createCourse);
adminRouter.get("/course", getCourse);
adminRouter.post("/course/section", authMiddleware, adminMiddleware, createSection);
adminRouter.post("/publish-course", authMiddleware, adminMiddleware, publishCourse);
adminRouter.get("/course/:courseId", authMiddleware, adminMiddleware, getSingleCourse);
adminRouter.put("/course/:courseId", authMiddleware, adminMiddleware, upload.single("thumbnail"), convertToWebp, updateCourse);
adminRouter.delete("/course", authMiddleware, adminMiddleware, deleteCourse);

adminRouter.get("/user_queries", authMiddleware, adminMiddleware, getUserQueries);

// ---------------------------------- Discount Routes ------------------------------
adminRouter.post("/discount", authMiddleware, adminMiddleware, createDiscount);
adminRouter.delete("/discount", authMiddleware, adminMiddleware, removeDiscount);
adminRouter.put("/discount", authMiddleware, adminMiddleware, updateDiscount);
adminRouter.get("/discounts", authMiddleware, adminMiddleware, getDiscounts)

// ---------------------------------- User Routes ----------------------------------
adminRouter.get("/get_users", authMiddleware, adminMiddleware, getUsersController);



export default adminRouter;
