"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidObjectId = checkValidObjectId;
const mongoose_1 = require("mongoose");
function checkValidObjectId(id, res) {
    if ((0, mongoose_1.isValidObjectId)(id)) {
        res.status(403).json({
            success: false,
            message: "Invalid ID!"
        });
        return;
    }
}
