"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidObjectId = checkValidObjectId;
const mongoose_1 = require("mongoose");
function checkValidObjectId(id) {
    if ((0, mongoose_1.isValidObjectId)(id)) {
        return true;
    }
    else {
        return false;
    }
}
