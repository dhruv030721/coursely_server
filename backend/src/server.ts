import { Application, Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
import routes from "./routes/router";
import { logger, morganMiddleware } from "yayinstocks_shared_module";
import { initalizeDBPackage } from "yayinstocks_shared_module";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createProxyMiddleware } from "http-proxy-middleware";

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 3000;

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
if (process.env.ENV_MODE === "QA") {
  app.use(
    cors({
      origin: ["https://qa.yayinstocks.in", "https://qa-admin.yayinstocks.in"],
      credentials: true,
    })
  );
  app.use(
    "/api/video-service",
    createProxyMiddleware({
      target: process.env.VIDEO_URL_QA,
      changeOrigin: true,
      pathRewrite: { "^/api/video-service": "" },
      secure: true,
    })
  );
} else if (process.env.ENV_MODE === "PROD") {
  app.use(cors({ origin: ["https://yayinstocks.in"], credentials: true }));
  app.use(
    "/api/video-service",
    createProxyMiddleware({
      target: process.env.VIDEO_URL_PROD,
      changeOrigin: true,
      pathRewrite: { "^/api/video-service": "" },
      secure: true,
    })
  );
} else {
  app.use(cors({ origin: true, credentials: true }));
  app.use(
    "/api/video-service",
    createProxyMiddleware({
      target: process.env.VIDEO_URL_DEV,
      changeOrigin: true,
      pathRewrite: { "^/api/video-service": "" },
      secure: true,
    })
  );
}

app.use(morganMiddleware);
app.use("/images", express.static("src/images"));
// Server Listening
app.listen(PORT, () => {
  logger.info(`Server started on ${PORT} successfully!`);

  // Database connection
  initalizeDBPackage();

  routes(app);
});

// Server main route
app.get("/", (req: Request, res: Response) => {
  res.send("Yayinstocks server running....");
});
