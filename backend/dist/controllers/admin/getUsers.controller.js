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
const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ✅ pagination params from query
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        // ✅ total user count
        const total = yield yayinstocks_shared_module_1.User.countDocuments();
        // ✅ fetch paginated users
        const users = yield yayinstocks_shared_module_1.User.find({})
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // optional: latest first
        if (!users || users.length === 0) {
            res.status(404).json({
                success: false,
                message: "No users found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: users,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error in [getUsersController]:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return;
    }
});
exports.default = getUsersController;
