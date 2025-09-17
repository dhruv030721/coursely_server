import { Request, Response } from "express"
import { logger, User } from "yayinstocks_shared_module"

const updateUserDetailsController = async (req: Request, res: Response) => {
    try {

        const { email, name, age, contact } = req.body;

        if (!email || !name || !contact) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        const user = await User.findOne({ email }).select("name age contact email");

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        user.name = name;
        user.age = age;
        user.contact = contact;
        await user.save();

        res.status(200).json({ message: "User details updated successfully", user });
        return;

    } catch (error) {
        logger.error("Error in [updateUserDetailsController]: ", error)
        res.status(500).json({ message: "Internal server error" })
        return;
    }
}

export default updateUserDetailsController