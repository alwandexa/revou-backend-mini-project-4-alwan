import { PoolConnection } from "mysql2/promise";

import {
  CreateBookingRequest,
  CreateBookingResponse,
  GetBookingHistoryRequest,
} from "../models/booking-model";
import { BookingRepository } from "../repositories/booking-repository";
import { validateRequiredKeys } from "../utils/util";
import { ScheduleRepository } from "../repositories/schedule-repository";
import { StudioRepository } from "../repositories/studio-repository";

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

    const schedule = await ScheduleRepository.lockSchedule(
      createBookingRequest.schedule_id,
      connection
    );

    const scheduleBookingAmount =
      await BookingRepository.getScheduleBookingAmount(
        createBookingRequest.schedule_id,
        connection
      );

    const studio = await StudioRepository.getStudioById(
      schedule.studio_id,
      connection
    );

    if (scheduleBookingAmount + createBookingRequest.amount > studio.capacity) {
      throw new Error("Schedule is full");
    }

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
