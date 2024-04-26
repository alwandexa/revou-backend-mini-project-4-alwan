import { PoolConnection } from "mysql2/promise";

import {
  CreateBookingRequest,
  CreateBookingResponse,
  GetBookingHistoryRequest,
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
  getHistoryByUserId: async (
    getBookingHistoryRequest: GetBookingHistoryRequest,
    connection: PoolConnection
  ) => {
    console.log(getBookingHistoryRequest)
    
    if(getBookingHistoryRequest.user_id === undefined || getBookingHistoryRequest.user_id === null){
      throw new Error("User ID is required");
    }

    const bookingHistory = await BookingRepository.getHistoryByUserId(
      getBookingHistoryRequest,
      connection
    );

    return bookingHistory;
  },
};

export { BookingService };
