"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../../middlewares");
const login_controller_1 = __importDefault(require("./login.controller"));
const logout_controller_1 = __importDefault(require("./logout.controller"));
const verifyToken_controller_1 = __importDefault(require("./verifyToken.controller"));
const authRouter = express_1.default.Router();
authRouter.post('/login', middlewares_1.userMiddleware, login_controller_1.default);
authRouter.post('/logout', middlewares_1.authMiddleware, logout_controller_1.default);
authRouter.post('/admin/login', middlewares_1.adminMiddleware, login_controller_1.default);
authRouter.get('/verify_token', middlewares_1.authMiddleware, verifyToken_controller_1.default);
exports.default = authRouter;
