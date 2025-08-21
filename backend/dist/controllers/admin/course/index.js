"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.getSingleCourse = exports.updateCourse = exports.publishCourse = exports.createSection = exports.getCourse = exports.createCourse = void 0;
const createCourse_controller_1 = __importDefault(require("./createCourse.controller"));
exports.createCourse = createCourse_controller_1.default;
const getCourse_controller_1 = require("./getCourse.controller");
Object.defineProperty(exports, "getCourse", { enumerable: true, get: function () { return getCourse_controller_1.getCourse; } });
Object.defineProperty(exports, "getSingleCourse", { enumerable: true, get: function () { return getCourse_controller_1.getSingleCourse; } });
const createSection_controller_1 = __importDefault(require("./section/createSection.controller"));
exports.createSection = createSection_controller_1.default;
const publishCourse_controller_1 = __importDefault(require("./publishCourse.controller"));
exports.publishCourse = publishCourse_controller_1.default;
const updateCourse_controller_1 = __importDefault(require("./updateCourse.controller"));
exports.updateCourse = updateCourse_controller_1.default;
const deleteCourse_controller_1 = __importDefault(require("./deleteCourse.controller"));
exports.deleteCourse = deleteCourse_controller_1.default;
