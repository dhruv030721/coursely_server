import { Request, Response } from "express";
import mongoose from "mongoose";
import { Course, logger } from "yayinstocks_shared_module";

const getCourse = async (req: Request, res: Response) => {
  try {
    // fetch all courses
    const courses = await Course.find({}).lean();

    // remove video_url from lectures
    courses.forEach((course) => {
      course.sections.forEach((section: any) => {
        section.lectures.forEach((lecture: any) => {
          delete lecture.video_url;
        });
      });
    });

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

const getSingleCourse = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      res.status(403).json({
        success: false,
        message: "courseId is not found!",
      });
      return;
    }

    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404).json({
        success: false,
        message: "Course not found!",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Course fetched successfully!",
      course,
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

export { getCourse, getSingleCourse };
