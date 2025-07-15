"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../controllers/user/index"));
const index_2 = __importDefault(require("../controllers/web/index"));
const index_3 = __importDefault(require("../controllers/auth/index"));
const admin_1 = __importDefault(require("../controllers/admin"));
const routes = (app) => {
    app.use("/api/v1", index_1.default);
    app.use("/api/v1", index_2.default);
    app.use("/api/v1", index_3.default);
    app.use("/api/v1/admin", admin_1.default);
};
exports.default = routes;
