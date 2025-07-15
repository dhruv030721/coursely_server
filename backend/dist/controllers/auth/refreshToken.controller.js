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
exports.refreshTokenController = void 0;
const yayinstocks_shared_module_1 = require("yayinstocks_shared_module");
const yayinstocks_shared_module_2 = require("yayinstocks_shared_module");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAuthToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
};
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};
const refreshTokenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            res.status(401).json({ success: false, message: 'Refresh token not found' });
            return;
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = yield yayinstocks_shared_module_2.User.findOne({ email: decoded.email });
            if (!user) {
                res.status(404).json({ success: false, message: 'User not found' });
                return;
            }
            const payload = { email: decoded.email };
            const newAuthToken = generateAuthToken(payload);
            const newRefreshToken = generateRefreshToken(payload);
            yield yayinstocks_shared_module_2.User.updateOne({ email: decoded.email }, { $set: { refreshToken: newRefreshToken } });
            res.cookie("auth_token", newAuthToken, {
                httpOnly: true,
                secure: true,
                maxAge: 900000,
                sameSite: 'none'
            }).status(200).json({
                success: true,
                message: 'Auth token refreshed successfully',
                token: newAuthToken
            });
            yayinstocks_shared_module_1.logger.info(`Auth token refreshed successfully for user ${decoded.email}`);
            return;
        }
        catch (tokenError) {
            res.clearCookie('auth_token').clearCookie('refresh_token').status(401).json({
                success: false,
                message: 'Invalid or expired refresh token'
            });
            return;
        }
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error('Error in [refresh token controller]:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
});
exports.refreshTokenController = refreshTokenController;
