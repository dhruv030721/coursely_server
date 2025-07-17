import mongoose from "mongoose";
interface CourseVideoDocument extends mongoose.Document {
  title: string;
  sequence: number;
  video_playback_time: string;
  description: string;
  video_url: string;
}
declare const courseVideoSchema: mongoose.Schema<
  CourseVideoDocument,
  mongoose.Model<
    CourseVideoDocument,
    any,
    any,
    any,
    mongoose.Document<unknown, any, CourseVideoDocument, any> &
      CourseVideoDocument &
      Required<{
        _id: unknown;
      }> & {
        __v: number;
      },
    any
  >,
  {},
  {},
  {},
  {},
  mongoose.DefaultSchemaOptions,
  CourseVideoDocument,
  mongoose.Document<unknown, {}, mongoose.FlatRecord<CourseVideoDocument>, {}> &
    mongoose.FlatRecord<CourseVideoDocument> &
    Required<{
      _id: unknown;
    }> & {
      __v: number;
    }
>;
export { CourseVideoDocument, courseVideoSchema };
