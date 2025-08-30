import express, { Application } from "express";
import dotenv from "dotenv";
import {
  logger,
  morganMiddleware,
  initalizeDBPackage,
  ensureDirectories,
} from "yayinstocks_shared_module";
import router from "./routes/router";
import cors from "cors";

dotenv.config();

const app: Application = express();
app.use(morganMiddleware);
app.use(express.json({ limit: '1G' }));
app.use(express.urlencoded({ limit: '1G', extended: true }));
app.set("trust proxy", 1); // trust first proxy (nginx)


if (process.env.ENV_MODE === "QA") {
  app.use(
    cors({
      origin: ["https://qa-admin.yayinstocks.in", "https://www.qa.yayinstocks.in"],
      credentials: true,
    })
  );
} else if (process.env.ENV_MODE === "PROD") {
  app.use(cors({ origin: ["https://admin.yayinstocks.in", "https://www.yayinstocks.in"], credentials: true }));
} else {
  app.use(cors({ origin: true, credentials: true }));
}

app.use(router);
app.use("/videos", express.static("outputs"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await ensureDirectories();
  logger.info(`Video Processing Server is starting on port ${PORT}`);

  initalizeDBPackage();
});
