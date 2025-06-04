import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
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
        type: Number,
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
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "CourseVideo",
                    }
                ]
            }
        ],
    }
});

const Course = mongoose.model('Course', courseSchema);
export default Course;