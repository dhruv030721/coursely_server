"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../../middlewares");
const discount_1 = require("./discount");
const user_1 = require("./user");
const adminRouter = express_1.default.Router();
// ----------------------------------Discount Routes----------------------------------
adminRouter.post("/discount", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, discount_1.createDiscount);
adminRouter.get("/discount", discount_1.getDiscount);
adminRouter.delete("/discount", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, discount_1.removeDiscount);
adminRouter.get("/discount/verify", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, discount_1.verifyDiscount);
adminRouter.put("/discount", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, discount_1.updateDiscount);
// ----------------------------------User Routes----------------------------------
adminRouter.get("/get_users", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, user_1.getUser);
exports.default = adminRouter;
