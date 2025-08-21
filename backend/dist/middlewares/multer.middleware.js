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
exports.convertToWebp = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
// Create destination folder if it doesn't exist
const imageDir = "src/images/";
if (!fs_1.default.existsSync(imageDir)) {
    fs_1.default.mkdirSync(imageDir, { recursive: true });
}
// Use memory storage for multer
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
exports.upload = upload;
// Middleware to convert image to webp and save
const convertToWebp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file)
        return next();
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const outputFilename = uniqueSuffix + ".webp";
    const outputPath = path_1.default.join(imageDir, outputFilename);
    try {
        yield (0, sharp_1.default)(req.file.buffer).webp({ quality: 80 }).toFile(outputPath);
        // Save path or filename to req for use in your handler
        req.file.filename = outputFilename;
        req.file.path = outputPath;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.convertToWebp = convertToWebp;
