import express, { Router } from 'express';
import { processVideo } from "../controller/processVideo.controller";
import { upload } from "../middleware/multer";

const router: Router = express.Router();

router.post('/process-video', upload.single("file"), processVideo);

export default router;