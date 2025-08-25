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
const removeLectureController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId, sectionId, lectureId } = req.body;
        console.log(courseId, sectionId, lectureId);
        const course = yield yayinstocks_shared_module_1.Course.findById(courseId);
        if (!course) {
            res.status(404).json({ success: false, message: "Course not found" });
            return;
        }
        const section = course.sections.find(sec => sec._id ? sec._id.toString() === sectionId : false);
        if (!section) {
            res.status(404).json({ success: false, message: "Section not found" });
            return;
        }
        const lecture = section.lectures.find(lec => lec._id ? lec._id.toString() === lectureId : false);
        if (!lecture) {
            res.status(404).json({ success: false, message: "Lecture not found" });
            return;
        }
        section.lectures = section.lectures.filter(lec => lec._id ? lec._id.toString() !== lectureId : true);
        yield course.save();
        res.status(200).json({ success: true, message: "Lecture removed successfully" });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error in [removeLectureController]:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
});
exports.default = removeLectureController;
