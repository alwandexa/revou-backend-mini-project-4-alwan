import { PoolConnection } from "mysql2/promise";

import {
  CreateBookingRequest,
  CreateBookingResponse,
} from "../models/booking-model";
import { BookingRepository } from "../repositories/booking-repository";

const BookingService = {
  create: async (
    createBookingRequest: CreateBookingRequest,
    connection: PoolConnection
  ): Promise<CreateBookingResponse> => {
    const createdBookingId = await BookingRepository.create(
      createBookingRequest,
      connection
    );

    return {
      booking_id: createdBookingId.insertId,
    };
  },
};

export { BookingService };
