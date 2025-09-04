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
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, price } = req.body;
        const thumbnail = req.file;
        if (!title || !description || !price) {
            res
                .status(400)
                .json({ success: false, message: "All fields are required." });
            return;
        }
        if (!thumbnail) {
            res
                .status(400)
                .json({ success: false, message: "Thumbnail is required." });
            return;
        }
        const baseUrl = process.env.ENV_MODE === "QA"
            ? process.env.BD_URL_QA
            : process.env.ENV_MODE === "PROD"
                ? process.env.BD_URL_PROD
                : process.env.BD_URL_DEV;
        console.log("Base URL:", baseUrl);
        if (!baseUrl) {
            throw new Error("Base URL for environment is not defined.");
        }
        const thumbnailUrl = new URL(`/images/${thumbnail.filename}`, baseUrl).toString();
        const course = yield yayinstocks_shared_module_1.Course.create({
            title,
            description,
            price,
            thumbnail: thumbnailUrl,
            status: "draft",
            featured: false,
        });
        res.status(201).json({
            success: true,
            message: "Course created successfully.",
            data: {
                courseId: course._id,
            },
        });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error creating course:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
        return;
    }
});
exports.default = createCourse;
