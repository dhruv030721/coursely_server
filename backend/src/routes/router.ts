import { Application } from "express"
import userRouter from "../controllers/user/index";
import webRouter from "../controllers/web/index";
import authRouter from "../controllers/auth/index";
import adminRouter from "../controllers/admin";

const routes = (app: Application) => {
    app.use("/api/v1", userRouter);
    app.use("/api/v1", webRouter);
    app.use("/api/v1", authRouter);
    app.use("/api/v1/admin", adminRouter);
}

export default routes;