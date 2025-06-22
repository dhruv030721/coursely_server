import express from "express";
import { subScribeController } from "./subscribe.controller";
import { contactUsController } from "./contactUs.controller"

const webRouter = express.Router();

webRouter.get('/subscribe', subScribeController);
webRouter.post('/contactus', contactUsController);

export default webRouter;