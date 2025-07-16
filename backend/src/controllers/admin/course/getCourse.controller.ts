import { Request, Response } from "express";
import { Course, logger } from "yayinstocks_shared_module";

const getCourse = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find({ status: "published" });
    res.status(200).json({
      success: true,
      message: "Courses fetched successfully.",
      data: courses,
    });
    return;
  } catch (error) {
    logger.error("Error in [getCourse]:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
    return;
  }
};

export default getCourse;
