import { Request, Response, NextFunction } from "express";
import { logger, Course } from "yayinstocks_shared_module";

const publishCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId, featured, status } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({
        success: false,
        message: "Course not found",
      });
      return;
    }

    await Course.updateOne({ _id: courseId }, { status, featured });

    res.status(201).json({
      success: true,
      message: "Course published successfully",
    });
  } catch (error) {
    logger.error("Error in Publish Course controller");
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default publishCourse;
