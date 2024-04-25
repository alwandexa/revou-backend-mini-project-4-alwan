import { ResultSetHeader } from "mysql2";
import { PoolConnection } from "mysql2/promise";

import { CreateBookingRequest } from "../models/booking-model";

const BookingRepository = {
  create: async (
    createBookingRequest: CreateBookingRequest,
    connection: PoolConnection
  ) => {
    const query = `INSERT INTO bookings(user_id, schedule_id) VALUES(${createBookingRequest.user_id}, ${createBookingRequest.schedule_id})`;

    const result = await connection.query<ResultSetHeader>(query);

    return result[0];
  },
};

export { BookingRepository };
