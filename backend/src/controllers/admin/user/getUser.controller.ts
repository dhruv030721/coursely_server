import { Request, Response } from "express";
import { logger, roleENum } from "yayinstocks_shared_module";
import { User } from "yayinstocks_shared_module";

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({ role: roleENum.USER })
      .select("-password")
      .select("-refreshToken")
      .select("_id name email phoneNumber createdAt");
    if (users.length === 0) {
      res.status(404).json({ success: true, message: "No user found." });
      return;
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully.",
      data: users,
    });
    return;
  } catch (error) {
    logger.error("Error in [getUser]:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export default getUser;
