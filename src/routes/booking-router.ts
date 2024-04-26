import { Router } from "express";

import { authMiddleware as auth } from "../middlewares/authorization";
import { BookingController } from "../controllers/booking-controller";

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

export default bookingRouter;
