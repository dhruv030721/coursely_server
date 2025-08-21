"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiscounts = exports.updateDiscount = exports.removeDiscount = exports.getDiscount = exports.createDiscount = void 0;
const createDiscount_controller_1 = __importDefault(require("./createDiscount.controller"));
exports.createDiscount = createDiscount_controller_1.default;
const getDiscount_controller_1 = __importDefault(require("./getDiscount.controller"));
exports.getDiscount = getDiscount_controller_1.default;
const removeDiscount_controller_1 = __importDefault(require("./removeDiscount.controller"));
exports.removeDiscount = removeDiscount_controller_1.default;
const updateDiscount_controller_1 = __importDefault(require("./updateDiscount.controller"));
exports.updateDiscount = updateDiscount_controller_1.default;
const getDiscounts_controller_1 = __importDefault(require("./getDiscounts.controller"));
exports.getDiscounts = getDiscounts_controller_1.default;
