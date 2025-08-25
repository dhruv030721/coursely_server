"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../../middlewares");
const discount_1 = require("./discount");
const course_1 = require("./course");
const getUserQueries_controller_1 = __importDefault(require("./getUserQueries.controller"));
const getUsers_controller_1 = __importDefault(require("./getUsers.controller"));
const updateUserQueryStatus_controller_1 = __importDefault(require("./updateUserQueryStatus.controller"));
const adminRouter = express_1.default.Router();
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
adminRouter.get("/user_queries", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, getUserQueries_controller_1.default);
adminRouter.put("/query/status", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, updateUserQueryStatus_controller_1.default);
// ---------------------------------- Discount Routes ------------------------------
adminRouter.post("/discount", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, discount_1.createDiscount);
adminRouter.delete("/discount", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, discount_1.removeDiscount);
adminRouter.put("/discount", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, discount_1.updateDiscount);
adminRouter.get("/discounts", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, discount_1.getDiscounts);
// ---------------------------------- User Routes ----------------------------------
adminRouter.get("/get_users", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, getUsers_controller_1.default);
exports.default = adminRouter;
