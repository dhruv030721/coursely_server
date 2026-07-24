"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOnScreenCustomerReview = exports.removeCustomerReviewController = exports.getCustomerReviewByEmailController = exports.getCustomerReviewController = void 0;
const getCustomerReview_controller_1 = __importDefault(require("./getCustomerReview.controller"));
exports.getCustomerReviewController = getCustomerReview_controller_1.default;
const getCustomerReviewByEmail_Controller_1 = __importDefault(require("./getCustomerReviewByEmail.Controller"));
exports.getCustomerReviewByEmailController = getCustomerReviewByEmail_Controller_1.default;
const removeCustomerReview_controller_1 = __importDefault(require("./removeCustomerReview.controller"));
exports.removeCustomerReviewController = removeCustomerReview_controller_1.default;
const updateOnScreenCustomerReview_Controller_1 = __importDefault(require("./updateOnScreenCustomerReview.Controller"));
exports.updateOnScreenCustomerReview = updateOnScreenCustomerReview_Controller_1.default;
