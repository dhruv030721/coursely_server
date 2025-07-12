import mongoose from "mongoose";
declare const Course: mongoose.Model<{
    description: string;
    title: string;
    price: number;
    thumbnail: number;
    sections: mongoose.Types.DocumentArray<{
        title: string;
        lectures: mongoose.Types.ObjectId[];
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        title: string;
        lectures: mongoose.Types.ObjectId[];
    }> & {
        title: string;
        lectures: mongoose.Types.ObjectId[];
    }>;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    description: string;
    title: string;
    price: number;
    thumbnail: number;
    sections: mongoose.Types.DocumentArray<{
        title: string;
        lectures: mongoose.Types.ObjectId[];
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        title: string;
        lectures: mongoose.Types.ObjectId[];
    }> & {
        title: string;
        lectures: mongoose.Types.ObjectId[];
    }>;
}, {}> & {
    description: string;
    title: string;
    price: number;
    thumbnail: number;
    sections: mongoose.Types.DocumentArray<{
        title: string;
        lectures: mongoose.Types.ObjectId[];
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        title: string;
        lectures: mongoose.Types.ObjectId[];
    }> & {
        title: string;
        lectures: mongoose.Types.ObjectId[];
    }>;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    description: string;
    title: string;
    price: number;
    thumbnail: number;
    sections: mongoose.Types.DocumentArray<{
        title: string;
        lectures: mongoose.Types.ObjectId[];
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        title: string;
        lectures: mongoose.Types.ObjectId[];
    }> & {
        title: string;
        lectures: mongoose.Types.ObjectId[];
    }>;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    description: string;
    title: string;
    price: number;
    thumbnail: number;
    sections: mongoose.Types.DocumentArray<{
        title: string;
        lectures: mongoose.Types.ObjectId[];
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        title: string;
        lectures: mongoose.Types.ObjectId[];
    }> & {
        title: string;
        lectures: mongoose.Types.ObjectId[];
    }>;
}>, {}> & mongoose.FlatRecord<{
    description: string;
    title: string;
    price: number;
    thumbnail: number;
    sections: mongoose.Types.DocumentArray<{
        title: string;
        lectures: mongoose.Types.ObjectId[];
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        title: string;
        lectures: mongoose.Types.ObjectId[];
    }> & {
        title: string;
        lectures: mongoose.Types.ObjectId[];
    }>;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Course;
