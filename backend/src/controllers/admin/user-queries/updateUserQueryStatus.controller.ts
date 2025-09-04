import { Request, Response } from "express";
import { logger, ContactUs } from "yayinstocks_shared_module"

const updateUserQueryStatus = async (req: Request, res: Response) => {

    try {

        const { queryId, status } = req.body;

        const updatedQuery = await ContactUs.findByIdAndUpdate(queryId, { status }, { new: true });

        if (!updatedQuery) {
            res.status(404).json({ error: "Query not found" });
            return;
        }

        res.status(200).json({ message: "Query status updated successfully", query: updatedQuery });
        return;

    } catch (error) {
        logger.error("Error in [updateUserQueryStatus]:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
    }

}

export default updateUserQueryStatus;