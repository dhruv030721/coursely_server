"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserQueryStatus = exports.getUserQueryByEmail = exports.getUserQueries = void 0;
const getUserQueries_controller_1 = __importDefault(require("./getUserQueries.controller"));
exports.getUserQueries = getUserQueries_controller_1.default;
const updateUserQueryStatus_controller_1 = __importDefault(require("./updateUserQueryStatus.controller"));
exports.updateUserQueryStatus = updateUserQueryStatus_controller_1.default;
const getUserQueryByEmail_controller_1 = __importDefault(require("./getUserQueryByEmail.controller"));
exports.getUserQueryByEmail = getUserQueryByEmail_controller_1.default;
