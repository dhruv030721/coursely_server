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
exports.ensureDirectories = ensureDirectories;
exports.getVideoInfo = getVideoInfo;
const promises_1 = __importDefault(require("fs/promises"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
function ensureDirectories() {
    return __awaiter(this, void 0, void 0, function* () {
        const dirs = ['uploads', 'outputs'];
        for (const dir of dirs) {
            try {
                yield promises_1.default.access(dir);
            }
            catch (_a) {
                yield promises_1.default.mkdir(dir, { recursive: true });
            }
        }
    });
}
function getVideoInfo(inputPath) {
    return new Promise((resolve, reject) => {
        fluent_ffmpeg_1.default.ffprobe(inputPath, (err, metadata) => {
            var _a, _b, _c;
            if (err)
                return reject(err);
            const videoStream = metadata.streams.find(stream => stream.codec_type === 'video');
            if (!videoStream || !videoStream.width || !videoStream.height) {
                return reject(new Error('No video stream found or missing resolution info.'));
            }
            resolve({
                duration: (_a = metadata.format.duration) !== null && _a !== void 0 ? _a : 0,
                width: videoStream.width,
                height: videoStream.height,
                bitrate: (_c = (_b = metadata.format.bit_rate) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : '0'
            });
        });
    });
}
