"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subscribe_controller_1 = require("./subscribe.controller");
const contactUs_controller_1 = require("./contactUs.controller");
const webRouter = express_1.default.Router();
webRouter.get("/subscribe", subscribe_controller_1.subScribeController);
webRouter.post("/contactus", contactUs_controller_1.contactUsController);
exports.default = webRouter;
