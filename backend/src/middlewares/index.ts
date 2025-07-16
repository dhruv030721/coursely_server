import userMiddleware from "./user.middleware";
import adminMiddleware from "./admin.middleware";
import authMiddleware from "./auth.middleware";
import { convertToWebp, upload } from "./multer.middleware";

export {
  userMiddleware,
  adminMiddleware,
  authMiddleware,
  upload,
  convertToWebp,
};
