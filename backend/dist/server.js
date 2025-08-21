"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./routes/router"));
const yayinstocks_shared_module_1 = require("yayinstocks_shared_module");
const yayinstocks_shared_module_2 = require("yayinstocks_shared_module");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
// Load environment variables
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
if (process.env.ENV_MODE === "QA") {
    app.use((0, cors_1.default)({
        origin: ["https://qa.yayinstocks.in", "https://qa-admin.yayinstocks.in"],
        credentials: true,
    }));
}
else if (process.env.ENV_MODE === "PROD") {
    app.use((0, cors_1.default)({ origin: ["https://yayinstocks.in"], credentials: true }));
}
else {
    app.use((0, cors_1.default)({ origin: true, credentials: true }));
}
app.use("/api/video-service", (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: "http://localhost:4001",
    changeOrigin: true,
    pathRewrite: { "^/api/video-service": "" },
    secure: true,
}));
app.use(yayinstocks_shared_module_1.morganMiddleware);
app.use("/images", express_1.default.static("src/images"));
// Server Listening
app.listen(PORT, () => {
    yayinstocks_shared_module_1.logger.info(`Server started on ${PORT} successfully!`);
    // Database connection
    (0, yayinstocks_shared_module_2.initalizeDBPackage)();
    (0, router_1.default)(app);
});
// Server main route
app.get("/", (req, res) => {
    res.send("Yayinstocks server running....");
});
