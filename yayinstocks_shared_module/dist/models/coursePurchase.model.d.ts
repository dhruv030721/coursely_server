import mongoose from "mongoose";
declare const CoursePurchase: mongoose.Model<{
    createdAt: NativeDate;
    userId: mongoose.Types.ObjectId;
    courses: mongoose.Types.DocumentArray<{
        price: number;
        courseId: mongoose.Types.ObjectId;
        purchaseDate: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        price: number;
        courseId: mongoose.Types.ObjectId;
        purchaseDate: NativeDate;
    }> & {
        price: number;
        courseId: mongoose.Types.ObjectId;
        purchaseDate: NativeDate;
    }>;
    totalAmount: number;
    paymentStatus: string;
    transactionId?: string | null | undefined;
    orderId?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    userId: mongoose.Types.ObjectId;
    courses: mongoose.Types.DocumentArray<{
        price: number;
        courseId: mongoose.Types.ObjectId;
        purchaseDate: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        price: number;
        courseId: mongoose.Types.ObjectId;
        purchaseDate: NativeDate;
    }> & {
        price: number;
        courseId: mongoose.Types.ObjectId;
        purchaseDate: NativeDate;
    }>;
    totalAmount: number;
    paymentStatus: string;
    transactionId?: string | null | undefined;
    orderId?: string | null | undefined;
}, {}> & {
    createdAt: NativeDate;
    userId: mongoose.Types.ObjectId;
    courses: mongoose.Types.DocumentArray<{
        price: number;
        courseId: mongoose.Types.ObjectId;
        purchaseDate: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        price: number;
        courseId: mongoose.Types.ObjectId;
        purchaseDate: NativeDate;
    }> & {
        price: number;
        courseId: mongoose.Types.ObjectId;
        purchaseDate: NativeDate;
    }>;
    totalAmount: number;
    paymentStatus: string;
    transactionId?: string | null | undefined;
    orderId?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    userId: mongoose.Types.ObjectId;
    courses: mongoose.Types.DocumentArray<{
        price: number;
        courseId: mongoose.Types.ObjectId;
        purchaseDate: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        price: number;
        courseId: mongoose.Types.ObjectId;
        purchaseDate: NativeDate;
    }> & {
        price: number;
        courseId: mongoose.Types.ObjectId;
        purchaseDate: NativeDate;
    }>;
    totalAmount: number;
    paymentStatus: string;
    transactionId?: string | null | undefined;
    orderId?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    userId: mongoose.Types.ObjectId;
    courses: mongoose.Types.DocumentArray<{
        price: number;
        courseId: mongoose.Types.ObjectId;
        purchaseDate: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        price: number;
        courseId: mongoose.Types.ObjectId;
        purchaseDate: NativeDate;
    }> & {
        price: number;
        courseId: mongoose.Types.ObjectId;
        purchaseDate: NativeDate;
    }>;
    totalAmount: number;
    paymentStatus: string;
    transactionId?: string | null | undefined;
    orderId?: string | null | undefined;
}>, {}> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    userId: mongoose.Types.ObjectId;
    courses: mongoose.Types.DocumentArray<{
        price: number;
        courseId: mongoose.Types.ObjectId;
        purchaseDate: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        price: number;
        courseId: mongoose.Types.ObjectId;
        purchaseDate: NativeDate;
    }> & {
        price: number;
        courseId: mongoose.Types.ObjectId;
        purchaseDate: NativeDate;
    }>;
    totalAmount: number;
    paymentStatus: string;
    transactionId?: string | null | undefined;
    orderId?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default CoursePurchase;
