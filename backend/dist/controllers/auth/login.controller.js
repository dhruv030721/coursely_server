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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yayinstocks_shared_module_1 = require("yayinstocks_shared_module");
const yayinstocks_shared_module_2 = require("yayinstocks_shared_module");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateAuthToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
};
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res
                .status(400)
                .json({ success: false, message: "Email and password are required" });
            return;
        }
        const user = yield yayinstocks_shared_module_2.User.findOne({ email });
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ success: false, message: "Invalid password" });
            return;
        }
        const payload = {
            email: user.email,
        };
        const authToken = generateAuthToken(payload);
        const refreshToken = generateRefreshToken(payload);
        yield yayinstocks_shared_module_2.User.updateOne({ email: user.email }, { $set: { refreshToken } });
        if (!authToken || !refreshToken) {
            res
                .status(500)
                .json({ success: false, message: "Failed to generate tokens" });
            return;
        }
        const refreshTokenCookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
        };
        yayinstocks_shared_module_1.logger.info(`User ${user.email} logged in successfully`);
        res
            .cookie("refresh_token", refreshToken, refreshTokenCookieOptions)
            .status(200)
            .json({
            success: true,
            message: "Login successful",
            data: {
                email: user.email,
            },
            auth_token: authToken,
        });
        return;
    }
    catch (error) {
        if (!res.headersSent) {
            res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
        yayinstocks_shared_module_1.logger.error("Error in [login controller]:", error);
        return;
    }
});
exports.default = loginController;
