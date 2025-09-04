import express from "express";
import { adminMiddleware, authMiddleware, convertToWebp, upload } from "../../middlewares";
import { createDiscount, getDiscount, getDiscounts, removeDiscount, updateDiscount } from "./discount";
import { createCourse, getCourse, createSection, publishCourse, getSingleCourse, updateCourse, deleteCourse, removeLectureController, updateSectionTitleController, removeSectionController } from "./course";
import { getPaymentHistory, getPaymentHistoryByEmail } from "./payment";
import { getUserQueries, getUserQueryByEmail, updateUserQueryStatus } from "./user-queries";
import { getUsersController, getUserByEmail } from "./user";
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
adminRouter.delete("/course/section", authMiddleware, adminMiddleware, removeSectionController);

// ---------------------------------- User Queries Routes ------------------------------
adminRouter.get("/user_queries", authMiddleware, adminMiddleware, getUserQueries);
adminRouter.put("/query/status", authMiddleware, adminMiddleware, updateUserQueryStatus);
adminRouter.get("/query/:email", authMiddleware, adminMiddleware, getUserQueryByEmail);

// ---------------------------------- Payment Routes ------------------------------
adminRouter.get("/payment/history", authMiddleware, adminMiddleware, getPaymentHistory);
adminRouter.get("/payment/history/:email", authMiddleware, adminMiddleware, getPaymentHistoryByEmail);

// ---------------------------------- Discount Routes ------------------------------
adminRouter.post("/discount", authMiddleware, adminMiddleware, createDiscount);
adminRouter.delete("/discount", authMiddleware, adminMiddleware, removeDiscount);
adminRouter.put("/discount", authMiddleware, adminMiddleware, updateDiscount);
adminRouter.get("/discounts", authMiddleware, adminMiddleware, getDiscounts)

// ---------------------------------- User Routes ----------------------------------
adminRouter.get("/get_users", authMiddleware, adminMiddleware, getUsersController);
adminRouter.get("/get_users/:email", authMiddleware, adminMiddleware, getUserByEmail);



export default adminRouter;
