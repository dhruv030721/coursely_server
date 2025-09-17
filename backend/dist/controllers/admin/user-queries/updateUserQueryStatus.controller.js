"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const yayinstocks_shared_module_1 = require("yayinstocks_shared_module");
const updateUserQueryStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { queryId, status } = req.body;
        const updatedQuery = yield yayinstocks_shared_module_1.ContactUs.findByIdAndUpdate(queryId, { status }, { new: true });
        if (!updatedQuery) {
            res.status(404).json({ error: "Query not found" });
            return;
        }
        res.status(200).json({ message: "Query status updated successfully", query: updatedQuery });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error in [updateUserQueryStatus]:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
});
exports.default = updateUserQueryStatus;
