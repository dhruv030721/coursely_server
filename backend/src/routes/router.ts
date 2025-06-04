import { Application } from "express"
import { userRouter } from "../controllers/user/index";

const routes = (app: Application) => {
    app.use("/api/user", userRouter);
}

export default routes;