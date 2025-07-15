"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const forgotPassword_controller_1 = require("./forgotPassword.controller");
const signup_controller_1 = __importDefault(require("./signup.controller"));
const getUser_controller_1 = __importDefault(require("./getUser.controller"));
const userRouter = express_1.default.Router();
userRouter.post('/signup', signup_controller_1.default);
userRouter.post('/forgot_password', forgotPassword_controller_1.forgotPasswordController);
userRouter.post('/change_password', forgotPassword_controller_1.changePasswordController);
userRouter.get('/get_user/:email', getUser_controller_1.default);
exports.default = userRouter;
