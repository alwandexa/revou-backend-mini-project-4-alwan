import { ResultSetHeader } from "mysql2";
import { PoolConnection } from "mysql2/promise";

import { CreateScheduleRequest } from "../models/schedule-model";

const ScheduleRepository = {
  createSchedule: async (
    createScheduleRequest: CreateScheduleRequest,
    connection: PoolConnection
  ) => {
    const query = `INSERT INTO schedules(movie_id, studio_id, showtime, show_date) VALUES(${createScheduleRequest.movie_id}, ${createScheduleRequest.studio_id}, '${createScheduleRequest.showtime}', '${createScheduleRequest.show_date}')`;

    const result = await connection.query<ResultSetHeader>(query);

    return result[0];
  },
};

export { ScheduleRepository };
