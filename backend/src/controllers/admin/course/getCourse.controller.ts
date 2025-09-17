import { Request, Response } from "express";
import mongoose from "mongoose";
import { Course, CustomerReview, logger, PurchasedCourse } from "yayinstocks_shared_module";

const getCourse = async (req: Request, res: Response) => {
  try {
    // fetch all courses
    let courses = await Course.find({}).lean();

    // remove video_url from lectures
    courses = await Promise.all(
      courses.map(async (course: any) => {
        const review: any = await CustomerReview.findOne({ courseId: course._id }).populate("userId", "name");
        let averageRating = 0;
        if (Array.isArray(review) && review.length > 0) {
          averageRating = review.map((r: any) => r.rating).reduce((a: number, b: number) => a + b, 0) / (review.length || 1);
        }
        const users = await PurchasedCourse.find({ items: course._id }).countDocuments();
        course.sections.forEach((section: any) => {
          section.lectures.forEach((lecture: any) => {
            delete lecture.video_url;
          });
        });

        return {
          ...course,
          reviews: review ? [review] : [],
          users,
          averageRating: averageRating < 0 ? review.rating : Math.round(averageRating * 10) / 10,
        };
      }));


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
