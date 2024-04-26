import express, { Router } from "express";

import { MovieController } from "./controllers/movie-controller";
import { ScheduleController } from "./controllers/schedule-controller";
import { UserController } from "./controllers/user-controller";
import { BookingController } from "./controllers/booking-controller";

import { authMiddleware as auth } from "./middlewares/authorization";

import movieRouter from "./routes/movie-router";

const startServer = async () => {
  try {
    const app = express();
    app.use(express.json());

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

    const userRouter = Router();
    userRouter.post("/register", UserController.register);
    userRouter.post("/login", UserController.login);

    const bookingRouter = Router();
    bookingRouter.post(
      "/book/create",
      auth("user"),
      BookingController.createBooking
    );
    bookingRouter.post(
      "/book/history",
      auth("user"),
      BookingController.getBookings
    );

    app.use(movieRouter);
    app.use(scheduleRouter);
    app.use(userRouter);
    app.use(bookingRouter);

    const PORT = 3001;

    app.listen(PORT, () => {
      console.log(`Server is running in http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("failed to start server :", error);
    process.exit(1);
  }
};

startServer();
