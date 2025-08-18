import { Request, Response, NextFunction } from "express";
import { logger, Course } from "yayinstocks_shared_module";

const createSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId, sectionName } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({
        success: false,
        message: "Course not found",
      });
      return;
    }

    course.sections.push({
      title: sectionName,
      lectures: [],
    });

    await course.save();

    const section = course.sections[course.sections.length - 1];

    res.status(201).json({
      success: true,
      message: "Section created successfully",
      section,
    });
  } catch (error) {
    logger.error("Error in createSection controller");
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default createSection;
