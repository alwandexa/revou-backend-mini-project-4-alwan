import { ResultSetHeader } from "mysql2";
import { PoolConnection, RowDataPacket } from "mysql2/promise";

import {
  CreateBookingRequest,
  GetBookingHistoryRequest,
  GetBookingHistoryResponse,
} from "../models/booking-model";

const BookingRepository = {
  create: async (
    createBookingRequest: CreateBookingRequest,
    connection: PoolConnection
  ) => {
    const query = `INSERT INTO bookings(user_id, schedule_id, amount) VALUES(${createBookingRequest.user_id}, ${createBookingRequest.schedule_id}, ${createBookingRequest.amount})`;

    const result = await connection.query<ResultSetHeader>(query);

    return result[0];
  },
  getHistoryByUserId: async (
    getBookingHistoryRequest: GetBookingHistoryRequest,
    connection: PoolConnection
  ) => {
    const query = `select
    m.title,
    b.created_at as booking_date,
    b.amount,
    s.showtime,
    s.showdate
  from
    bookings b
  inner join schedules s on
    s.schedule_id = b.schedule_id
  inner join movies m on
    m.movie_id = s.movie_id
  WHERE
    user_id = ${getBookingHistoryRequest.user_id}
  order by
    booking_date desc;`;

    const [rows] = await connection.query<RowDataPacket[]>(query);

    const result: GetBookingHistoryResponse[] = rows.map((value) => ({
      title: value.title,
      booking_date: value.booking_date,
      amount: value.amount,
      showtime: value.showtime,
      showdate: value.showdate,
    }));

    return result;
  },
};

export { BookingRepository };
