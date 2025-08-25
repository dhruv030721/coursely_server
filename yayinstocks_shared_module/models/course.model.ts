import mongoose from "mongoose";
interface CourseDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  sections: {
    _id?: mongoose.Types.ObjectId;
    title: string;
    lectures: {
      _id?: mongoose.Types.ObjectId;
      title: string;
      sequence: number;
      video_playback_time: string;
      description: string;
      video_url: string;
    }[];
  }[];
  status: "draft" | "published";
  featured: boolean;
}

const courseSchema = new mongoose.Schema<CourseDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    sections: {
      type: [
        {
          title: {
            type: String,
            required: true,
          },
          lectures: [
            {
              title: {
                type: String,
                required: true,
              },
              sequence: {
                type: Number,
                required: true,
              },
              video_playback_time: {
                type: String,
                required: true,
              },
              description: {
                type: String,
                required: true,
              },
              video_url: {
                type: String,
                required: true,
              },
            },
          ],
        },
      ],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export { CourseDocument, courseSchema };
