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
const yayinstocks_shared_module_2 = require("yayinstocks_shared_module");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const [users, total] = yield Promise.all([
            yayinstocks_shared_module_2.User.find({ role: yayinstocks_shared_module_1.roleENum.USER })
                .select("-password -refreshToken")
                .select("_id name email phoneNumber createdAt")
                .skip(skip)
                .limit(limit),
            yayinstocks_shared_module_2.User.countDocuments({ role: yayinstocks_shared_module_1.roleENum.USER }),
        ]);
        if (users.length === 0) {
            res.status(404).json({ success: true, message: "No user found." });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Users fetched successfully.",
            data: users,
        });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error in [getUser]:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});
exports.default = getUser;
