import { Request, Response, NextFunction } from "express";
import { logger, User } from "yayinstocks_shared_module";

const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let userObject;

    if (!req.body.userObject) {
      if (req.body.email) {
        userObject = await User.findOne({ email: req.body.email });
        if (!userObject) {
          logger.error("Permission denied, User not found!");
          res.status(401).json({
            success: false,
            message: "Permission denied! User not found",
          });
          return;
        }
      }
    }

    if (userObject && userObject.role !== "admin") {
      res.status(401).json({
        success: false,
        message:
          "Permission denied! You are not authorized to access this resource.",
      });
      return;
    }
    next();
  } catch (error) {
    logger.error("Error in [admin middleware]:", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
    return;
  }
};

export default adminMiddleware;
