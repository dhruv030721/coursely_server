import { CookieOptions, Request, Response } from "express";
import { logger, Cart } from "yayinstocks_shared_module";
import { User } from "yayinstocks_shared_module";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateAuthToken = (payload: { email: string }): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = (payload: { email: string }): string => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: "7d",
  });
};

const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid password" });
      return;
    }

    const payload = {
      email: user.email,
    };

    const authToken = generateAuthToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await User.updateOne({ email: user.email }, { $set: { refreshToken } });

    if (!authToken || !refreshToken) {
      res
        .status(500)
        .json({ success: false, message: "Failed to generate tokens" });
      return;
    }

    const refreshTokenCookieOptions: CookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    };

    // const cart = await Cart.findById(user._id);

    logger.info(`User ${user.email} logged in successfully`);
    res
      .cookie("refresh_token", refreshToken, refreshTokenCookieOptions)
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        data: {
          email: user.email,
        },
        auth_token: authToken,
      });
    return;
  } catch (error) {
    if (!res.headersSent) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    logger.error("Error in [login controller]:", error);
    return;
  }
};

export default loginController;
