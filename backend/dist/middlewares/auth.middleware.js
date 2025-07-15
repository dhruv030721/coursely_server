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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const yayinstocks_shared_module_1 = require("yayinstocks_shared_module");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const authToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!authToken) {
            yayinstocks_shared_module_1.logger.error('Permission denied, Token validation failed!');
            res.status(401).json({ success: false, message: 'Permission denied! Token not found' });
            return;
        }
        if (authToken) {
            let decoded;
            try {
                decoded = jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET);
            }
            catch (error) {
                if (error.name === 'TokenExpiredError') {
                    yayinstocks_shared_module_1.logger.error('Token expired!');
                    res.status(401).json({ success: false, message: 'Token expired' });
                    return;
                }
                yayinstocks_shared_module_1.logger.error('Invalid token!');
                res.status(401).json({ success: false, message: 'Invalid token' });
                return;
            }
            if (!decoded) {
                yayinstocks_shared_module_1.logger.error('Permission denied, Auth token validation failed!');
                res.status(401).json({ success: false, message: 'Permission denied! You are not authorized to access this resource.' });
                return;
            }
            req.body.email = decoded.email;
        }
        const userObject = yield yayinstocks_shared_module_1.User.findOne({ email: req.body.email });
        if (!userObject) {
            yayinstocks_shared_module_1.logger.error('Permission denied, User not found!');
            res.status(401).json({ success: false, message: 'Permission denied! User not found' });
            return;
        }
        req.body.userObject = userObject;
        if (!userObject.refreshToken) {
            yayinstocks_shared_module_1.logger.error('Permission denied, Token validation failed!');
            res.status(401).json({ success: false, message: 'Permission denied! Token not found' });
            return;
        }
        if (userObject.refreshToken) {
            try {
                jsonwebtoken_1.default.verify(userObject.refreshToken, process.env.REFRESH_TOKEN_SECRET);
            }
            catch (error) {
                yayinstocks_shared_module_1.logger.error('Permission denied, Refresh token validation failed!');
                res.status(401).json({ success: false, message: 'Permission denied! You are not authorized to access this resource.' });
                return;
            }
        }
        next();
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error('Error in [auth middleware]:', error);
        res.status(500).json({ success: false, message: 'Internal server error!' });
        return;
    }
});
exports.default = authMiddleware;
