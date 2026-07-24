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
const getCourseUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        if (!courseId) {
            res.status(403).json({ success: false, message: "courseId is not found!" });
            return;
        }
        const courseUsers = yield yayinstocks_shared_module_1.PurchasedCourse.find({ items: courseId }).select("email createdAt");
        res.status(200).json({ success: true, data: courseUsers });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error in [getCourseUsersController]:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
});
exports.default = getCourseUsersController;
