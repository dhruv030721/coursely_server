import { Request, Response } from "express";
import { logger, roleENum } from "yayinstocks_shared_module";
import { User } from "yayinstocks_shared_module";

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find({ role: roleENum.USER })
        .select("-password -refreshToken")
        .select("_id name email phoneNumber createdAt")
        .skip(skip)
        .limit(limit),
      User.countDocuments({ role: roleENum.USER }),
    ]);

    if (users.length === 0) {
      res.status(404).json({ success: true, message: "No user found." });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Users fetched successfully.",
      data: users,
    });
    return;
  } catch (error) {
    logger.error("Error in [getUser]:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export default getUser;
