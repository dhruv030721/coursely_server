import { Application } from "express"
import { userRouter } from "../controllers/user/index";

const routes = (app: Application) => {
    app.use("/api/v1", userRouter);
}

export default routes;