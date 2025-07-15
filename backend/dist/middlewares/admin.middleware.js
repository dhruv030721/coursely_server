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
const adminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userObject;
        if (!req.body.userObject) {
            if (req.body.email) {
                userObject = yield yayinstocks_shared_module_1.User.findOne({ email: req.body.email });
                if (!userObject) {
                    yayinstocks_shared_module_1.logger.error("Permission denied, User not found!");
                    res.status(401).json({
                        success: false,
                        message: "Permission denied! User not found",
                    });
                    return;
                }
            }
        }
        if (userObject && userObject.role !== "admin") {
            res.status(401).json({
                success: false,
                message: "Permission denied! You are not authorized to access this resource.",
            });
            return;
        }
        next();
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error in [admin middleware]:", error);
        res.status(500).json({ success: false, message: "Internal server error!" });
        return;
    }
});
exports.default = adminMiddleware;
