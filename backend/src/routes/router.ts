import { Application } from "express"
import userRouter from "../controllers/user/index";
import webRouter from "../controllers/web/index";
import authRouter from "../controllers/auth/index";

const routes = (app: Application) => {
    app.use("/api/v1", userRouter);
    app.use("/api/v1", webRouter);
    app.use("/api/v1", authRouter);
}

export default routes;