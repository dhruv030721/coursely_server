"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleCourse = exports.getCourse = void 0;
const yayinstocks_shared_module_1 = require("yayinstocks_shared_module");
const getCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // fetch all courses
        let courses = yield yayinstocks_shared_module_1.Course.find({}).lean();
        // remove video_url from lectures
        courses = yield Promise.all(courses.map((course) => __awaiter(void 0, void 0, void 0, function* () {
            const review = yield yayinstocks_shared_module_1.CustomerReview.findOne({ courseId: course._id }).populate("userId", "name");
            let averageRating = 0;
            if (Array.isArray(review) && review.length > 0) {
                averageRating = review.map((r) => r.rating).reduce((a, b) => a + b, 0) / (review.length || 1);
            }
            const users = yield yayinstocks_shared_module_1.PurchasedCourse.find({ items: course._id }).countDocuments();
            course.sections.forEach((section) => {
                section.lectures.forEach((lecture) => {
                    delete lecture.video_url;
                });
            });
            return Object.assign(Object.assign({}, course), { reviews: review ? [review] : [], users, averageRating: averageRating < 0 ? review.rating : Math.round(averageRating * 10) / 10 });
        })));
        res.status(200).json({
            success: true,
            message: "Courses fetched successfully.",
            data: courses,
        });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error in [getCourse]:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
        return;
    }
});
exports.getCourse = getCourse;
const getSingleCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        if (!courseId) {
            res.status(403).json({
                success: false,
                message: "courseId is not found!",
            });
            return;
        }
        const course = yield yayinstocks_shared_module_1.Course.findById(courseId);
        if (!course) {
            res.status(404).json({
                success: false,
                message: "Course not found!",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Course fetched successfully!",
            course,
        });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error in [getCourse]:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
        return;
    }
});
exports.getSingleCourse = getSingleCourse;
