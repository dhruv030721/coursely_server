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
const getUserPurchasedCoursesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const user = yield yayinstocks_shared_module_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const purchasedCourses = yield yayinstocks_shared_module_1.PurchasedCourse.findOne({ email }).populate("items");
        if (!purchasedCourses) {
            return res.status(404).json({ message: "No purchased courses found" });
        }
        res.status(200).json({
            success: true,
            data: purchasedCourses
        });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error occurred in [getUserPurchasedCoursesController]: ", error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
});
exports.default = getUserPurchasedCoursesController;
