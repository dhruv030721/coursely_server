import mongoose from "mongoose";
interface UserDocument extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    age: number;
    role: string;
    contact: string;
    refreshToken: string;
    authToken: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const userSchema: mongoose.Schema<UserDocument, mongoose.Model<UserDocument, any, any, any, mongoose.Document<unknown, any, UserDocument, any, {}> & UserDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, UserDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<UserDocument>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<UserDocument> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
export { userSchema, UserDocument };
