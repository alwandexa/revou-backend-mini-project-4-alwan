import { PoolConnection } from "mysql2/promise";

import {
  CreateBookingRequest,
  CreateBookingResponse,
  GetBookingHistoryRequest,
} from "../models/booking-model";
import { BookingRepository } from "../repositories/booking-repository";
import { validateRequiredKeys } from "../utils/util";

const BookingService = {
  create: async (
    createBookingRequest: CreateBookingRequest,
    connection: PoolConnection
  ): Promise<CreateBookingResponse> => {
    validateRequiredKeys(createBookingRequest, [
      "user_id",
      "schedule_id",
      "amount",
    ]);

    const createdBookingId = await BookingRepository.create(
      createBookingRequest,
      connection
    );

    return {
      booking_id: createdBookingId.insertId,
    };
  },
  getHistoryByUserId: async (
    getBookingHistoryRequest: GetBookingHistoryRequest,
    connection: PoolConnection
  ) => {
    validateRequiredKeys(getBookingHistoryRequest, ["user_id"]);

    const bookingHistory = await BookingRepository.getHistoryByUserId(
      getBookingHistoryRequest,
      connection
    );

    return bookingHistory;
  },
};

export { BookingService };
