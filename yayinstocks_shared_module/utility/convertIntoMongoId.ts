import { isValidObjectId } from "mongoose"
import { Response } from "express"

export function checkValidObjectId(id: string, res: Response) {
    if (isValidObjectId(id)) {
        res.status(403).json({
            success: false,
            message: "Invalid ID!"
        })
        return;
    }
}
