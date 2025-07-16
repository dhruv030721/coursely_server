import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { Request, Response, NextFunction } from "express";

// Create destination folder if it doesn't exist
const imageDir = "src/images/";
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

// Use memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to convert image to webp and save
const convertToWebp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) return next();

  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const outputFilename = uniqueSuffix + ".webp";
  const outputPath = path.join(imageDir, outputFilename);

  try {
    await sharp(req.file.buffer).webp({ quality: 80 }).toFile(outputPath);

    // Save path or filename to req for use in your handler
    req.file.filename = outputFilename;
    req.file.path = outputPath;
    next();
  } catch (error) {
    next(error);
  }
};

export { upload, convertToWebp };
