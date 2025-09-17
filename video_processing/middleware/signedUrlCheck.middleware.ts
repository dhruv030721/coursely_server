import path from "path";
import fs from "fs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const signedUrlCheckMiddleware = (req: Request, res: Response) => {
    const token = req.query.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token is required" });
    }

    try {
        const decoded = jwt.verify(
            token.toString(),
            process.env.JWT_SECRET as string
        ) as { filePath: string; exp: number };

        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            return res.status(401).json({ message: "Unauthorized: Token has expired" });
        }

        // ✅ Serve file manually
        const absolutePath = path.join(__dirname,"../outputs", decoded.filePath);
        if (!fs.existsSync(absolutePath)) {
            return res.status(404).json({ message: "File not found" });
        }

        return res.sendFile(absolutePath);
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};


export default signedUrlCheckMiddleware;