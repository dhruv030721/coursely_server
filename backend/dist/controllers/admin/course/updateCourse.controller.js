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
const yayinstocks_shared_module_1 = require("yayinstocks_shared_module");
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, price } = req.body;
        const { courseId } = req.params;
        const thumbnail = req.file;
        if (!title || !description || !price) {
            res.status(400).json({ success: false, message: "All fields are required." });
            return;
        }
        const courseObject = yield yayinstocks_shared_module_1.Course.findById(courseId);
        if (!courseObject) {
            res.status(404).json({ success: false, message: "Course not found." });
            return;
        }
        const courseData = {
            title,
            description,
            price,
            status: courseObject.status,
            featured: false
        };
        if (thumbnail) {
            const baseUrl = process.env.ENV_MODE == "QA"
                ? process.env.BD_URL_QA
                : process.env.ENV_MODE == "PROD"
                    ? process.env.BD_URL_PROD
                    : process.env.BD_URL_DEV;
            if (!baseUrl) {
                throw new Error("Base URL for environment is not defined.");
            }
            const thumbnailUrl = new URL(`/images/${thumbnail.filename}`, baseUrl).toString();
            courseData.thumbnail = thumbnailUrl;
            console.log(thumbnailUrl);
        }
        const course = yield yayinstocks_shared_module_1.Course.updateOne({ _id: courseId }, courseData);
        if (course.modifiedCount === 0) {
            res.status(404).json({ success: false, message: "Course not found or no changes made." });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Course updated successfully.",
            data: {
                courseId: courseId,
            },
        });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error updating course:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
        return;
    }
});
exports.default = updateCourse;
