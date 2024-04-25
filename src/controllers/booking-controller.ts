import { Request, Response } from "express";

import { BookingService } from "../services/booking-service";
import { CreateBookingRequest } from "../models/booking-model";
import { onError, onSuccess } from "../utils/util";
import { pool } from "../lib/database";

const BookingController = {
  createBooking: async (req: Request, res: Response) => {
    const connection = await pool.getConnection();

    try {
      const createBookingRequest = req.body as CreateBookingRequest;
      const createBookingResponse = await BookingService.create(
        createBookingRequest,
        connection
      );

      onSuccess(res, createBookingResponse, "Successfully created", 201);
    } catch (error: any) {
      onError(res, error.message);
    }
  },
};

export { BookingController };
