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
const publishCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId, featured, status } = req.body;
        const course = yield yayinstocks_shared_module_1.Course.findById(courseId);
        if (!course) {
            res.status(404).json({
                success: false,
                message: "Course not found",
            });
            return;
        }
        yield yayinstocks_shared_module_1.Course.updateOne({ _id: courseId }, { status, featured });
        res.status(201).json({
            success: true,
            message: "Course published successfully",
        });
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error in Publish Course controller");
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.default = publishCourse;
