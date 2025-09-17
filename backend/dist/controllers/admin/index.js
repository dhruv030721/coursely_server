"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../../middlewares");
const discount_1 = require("./discount");
const course_1 = require("./course");
const payment_1 = require("./payment");
const user_queries_1 = require("./user-queries");
const user_1 = require("./user");
const dashboard_controller_1 = __importDefault(require("./dashboard/dashboard.controller"));
const adminRouter = express_1.default.Router();
adminRouter.get("/dashboard", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, dashboard_controller_1.default);
// ---------------------------------- Course Routes --------------------------------
adminRouter.post("/course", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, middlewares_1.upload.single("thumbnail"), middlewares_1.convertToWebp, course_1.createCourse);
adminRouter.get("/course", course_1.getCourse);
adminRouter.post("/course/section", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, course_1.createSection);
adminRouter.post("/publish-course", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, course_1.publishCourse);
adminRouter.get("/course/:courseId", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, course_1.getSingleCourse);
adminRouter.put("/course/:courseId", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, middlewares_1.upload.single("thumbnail"), middlewares_1.convertToWebp, course_1.updateCourse);
adminRouter.delete("/course", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, course_1.deleteCourse);
adminRouter.delete("/course/section/lecture", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, course_1.removeLectureController);
adminRouter.put("/course/section/title", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, course_1.updateSectionTitleController);
adminRouter.delete("/course/section", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, course_1.removeSectionController);
adminRouter.get("/course/users/:courseId", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, course_1.getCourseUsersController);
// ---------------------------------- User Queries Routes ------------------------------
adminRouter.get("/user_queries", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, user_queries_1.getUserQueries);
adminRouter.put("/query/status", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, user_queries_1.updateUserQueryStatus);
adminRouter.get("/query/:email", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, user_queries_1.getUserQueryByEmail);
// ---------------------------------- Payment Routes ------------------------------
adminRouter.get("/payment/history", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, payment_1.getPaymentHistory);
adminRouter.get("/payment/history/:email", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, payment_1.getPaymentHistoryByEmail);
// ---------------------------------- Discount Routes ------------------------------
adminRouter.post("/discount", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, discount_1.createDiscount);
adminRouter.delete("/discount", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, discount_1.removeDiscount);
adminRouter.put("/discount", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, discount_1.updateDiscount);
adminRouter.get("/discounts", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, discount_1.getDiscounts);
// ---------------------------------- User Routes ----------------------------------
adminRouter.get("/get_users", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, user_1.getUsersController);
adminRouter.get("/get_users/:email", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, user_1.getUserByEmail);
exports.default = adminRouter;
