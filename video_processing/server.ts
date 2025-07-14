import express, { Application } from "express";
import dotenv from "dotenv";
import {
  logger,
  morganMiddleware,
  initalizeDBPackage,
  ensureDirectories,
} from "yayinstocks_shared_module";
import router from "./routes/router";

dotenv.config();

const app: Application = express();

app.use(morganMiddleware);
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await ensureDirectories();
  logger.info(`Video Processing Server is starting on port ${PORT}`);

  initalizeDBPackage();
});
