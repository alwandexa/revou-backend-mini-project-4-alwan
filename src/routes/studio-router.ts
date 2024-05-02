import { Router } from "express";

import { authMiddleware as auth } from "../middlewares/authorization";
import { StudioController } from "../controllers/studio-controller";

const studioRouter = Router();
studioRouter.post("/studio/add", auth("admin"), StudioController.createStudio);
studioRouter.patch(
  "/studio/update",
  auth("admin"),
  StudioController.updateStudio
);
studioRouter.delete(
  "/studio/delete",
  auth("admin"),
  StudioController.deleteStudio
);
studioRouter.get("/studio/list", auth("admin"), StudioController.getAllStudios);

export default studioRouter;
