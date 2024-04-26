import { Router } from "express";

import { authMiddleware as auth } from "../middlewares/authorization";
import { ScheduleController } from "../controllers/schedule-controller";

const scheduleRouter = Router();
scheduleRouter.post(
  "/schedule/create",
  auth("admin"),
  ScheduleController.createSchedule
);
scheduleRouter.patch(
  "/schedule/update",
  auth("admin"),
  ScheduleController.updateSchedule
);
scheduleRouter.delete(
  "/schedule/delete",
  auth("admin"),
  ScheduleController.deleteSchedule
);
scheduleRouter.get("/schedule/list", ScheduleController.getSchedules);

export default scheduleRouter;
