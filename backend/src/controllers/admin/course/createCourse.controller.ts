import { Request, Response } from "express";
import path from "path";
import { logger, Course } from "yayinstocks_shared_module";

const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, price } = req.body;
    const thumbnail = req.file;

    if (!title || !description || !price) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required." });
      return;
    }

    if (!thumbnail) {
      res
        .status(400)
        .json({ success: false, message: "Thumbnail is required." });
      return;
    }

    const baseUrl =
      process.env.ENV_MODE === "QA"
        ? process.env.BD_URL_QA
        : process.env.ENV_MODE === "PROD"
        ? process.env.BD_URL_PROD
        : process.env.BD_URL_DEV;
  
        console.log("Base URL:", baseUrl);
    if (!baseUrl) {
      throw new Error("Base URL for environment is not defined.");
    }

    const thumbnailUrl = new URL(
      `/images/${thumbnail.filename}`,
      baseUrl
    ).toString();

    const course = await Course.create({
      title,
      description,
      price,
      thumbnail: thumbnailUrl,
      status: "draft",
      featured: false,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully.",
      data: {
        courseId: course._id,
      },
    });
    return;
  } catch (error) {
    logger.error("Error creating course:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
    return;
  }
};

export default createCourse;
