import { Request, Response } from "express"
import { logger, ContactUs } from "yayinstocks_shared_module"


const getUserQueryByEmail = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        const userQuery = await ContactUs.find({ email });

        if (!userQuery) {
            res.status(404).json({ success: false, message: "User query not found." });
            return;
        }

        res.status(200).json({ success: true, message: "User query retrieved successfully.", data: userQuery });
        return;
    } catch (error) {
        logger.error("Error in [getUserQueryByEmail]:", error)
        res.status(500).json({ success: false, message: "Internal server error." })
        return;
    }
}

export default getUserQueryByEmail;