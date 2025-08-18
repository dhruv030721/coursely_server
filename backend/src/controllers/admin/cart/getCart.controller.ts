import { Request, Response } from "express"
import { User, logger, Cart } from "yayinstocks_shared_module"

const getCart = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;

        if (req.body.userObject.email != email) {
            res.status(403).json({
                success: false,
                message: "Unauthorized access!"
            })
            return;
        }

        if (!email) {
            res.status(400).json({
                success: false,
                message: "Validation Error!"
            })
            return;
        }

        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found!"
            })
            return;
        }

        const cartData = await Cart.findOne({ email }).populate({ path: "items", select: "title price" });
        if (!cartData) {
            res.status(404).json({
                success: false,
                message: "Cart data not found!"
            })
            return;
        }

        res.status(200).json({
            success: true,
            message: "Cart data fetched successfully!",
            data: cartData
        })
        return;

    } catch (error) {
        logger.error("Error in [getCart]:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}

export default getCart;