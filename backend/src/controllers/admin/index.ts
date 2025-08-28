import express from "express";
import { adminMiddleware, authMiddleware, convertToWebp, upload } from "../../middlewares";
import { createDiscount, getDiscount, getDiscounts, removeDiscount, updateDiscount } from "./discount";
import { createCourse, getCourse, createSection, publishCourse, getSingleCourse, updateCourse, deleteCourse, removeLectureController, updateSectionTitleController } from "./course";
import getUserQueries from "./getUserQueries.controller";
import getUsersController from "./getUsers.controller";
import updateUserQueryStatus from "./updateUserQueryStatus.controller";
import dashboardController from "./dashboard/dashboard.controller";

const adminRouter = express.Router();

adminRouter.get("/dashboard", authMiddleware, adminMiddleware, dashboardController);

// ---------------------------------- Course Routes --------------------------------
adminRouter.post("/course", authMiddleware, adminMiddleware, upload.single("thumbnail"), convertToWebp, createCourse);
adminRouter.get("/course", getCourse);
adminRouter.post("/course/section", authMiddleware, adminMiddleware, createSection);
adminRouter.post("/publish-course", authMiddleware, adminMiddleware, publishCourse);
adminRouter.get("/course/:courseId", authMiddleware, adminMiddleware, getSingleCourse);
adminRouter.put("/course/:courseId", authMiddleware, adminMiddleware, upload.single("thumbnail"), convertToWebp, updateCourse);
adminRouter.delete("/course", authMiddleware, adminMiddleware, deleteCourse);
adminRouter.delete("/course/section/lecture", authMiddleware, adminMiddleware, removeLectureController);
adminRouter.put("/course/section/title", authMiddleware, adminMiddleware, updateSectionTitleController);

adminRouter.get("/user_queries", authMiddleware, adminMiddleware, getUserQueries);
adminRouter.put("/query/status", authMiddleware, adminMiddleware, updateUserQueryStatus);

// ---------------------------------- Discount Routes ------------------------------
adminRouter.post("/discount", authMiddleware, adminMiddleware, createDiscount);
adminRouter.delete("/discount", authMiddleware, adminMiddleware, removeDiscount);
adminRouter.put("/discount", authMiddleware, adminMiddleware, updateDiscount);
adminRouter.get("/discounts", authMiddleware, adminMiddleware, getDiscounts)

// ---------------------------------- User Routes ----------------------------------
adminRouter.get("/get_users", authMiddleware, adminMiddleware, getUsersController);



export default adminRouter;
