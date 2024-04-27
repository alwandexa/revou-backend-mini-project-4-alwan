import { Router } from "express";

import { authMiddleware as auth } from "../middlewares/authorization";
import { StudioController } from "../controllers/studio-controller";

const studioRouter = Router();
studioRouter.post(
  "/studio/create",
  auth("admin"),
  StudioController.createStudio
);

export default studioRouter;
