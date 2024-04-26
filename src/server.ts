import express, { Router } from "express";

import { UserController } from "./controllers/user-controller";
import { BookingController } from "./controllers/booking-controller";

import { authMiddleware as auth } from "./middlewares/authorization";

import movieRouter from "./routes/movie-router";
import scheduleRouter from "./routes/schedule-router";

const startServer = async () => {
  try {
    const app = express();
    app.use(express.json());

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
