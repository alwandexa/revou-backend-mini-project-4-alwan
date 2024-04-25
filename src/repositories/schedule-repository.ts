import { ResultSetHeader } from "mysql2";
import { PoolConnection } from "mysql2/promise";

import {
  CreateScheduleRequest,
  UpdateScheduleRequest,
} from "../models/schedule-model";

const ScheduleRepository = {
  createSchedule: async (
    createScheduleRequest: CreateScheduleRequest,
    connection: PoolConnection
  ) => {
    const query = `INSERT INTO schedules(movie_id, studio_id, showtime, showdate) VALUES(${createScheduleRequest.movie_id}, ${createScheduleRequest.studio_id}, '${createScheduleRequest.showtime}', '${createScheduleRequest.showdate}')`;

    const result = await connection.query<ResultSetHeader>(query);

    return result[0];
  },
  updateSchedule: async (
    updateScheduleRequest: UpdateScheduleRequest,
    connection: PoolConnection
  ) => {
    const query = `UPDATE schedules SET movie_id = ${updateScheduleRequest.movie_id}, studio_id = ${updateScheduleRequest.studio_id}, showtime = '${updateScheduleRequest.showtime}', showdate = '${updateScheduleRequest.showdate}', updated_at = now() WHERE schedule_id = ${updateScheduleRequest.schedule_id}`;

    const result = await connection.query<ResultSetHeader>(query);

    return result[0].affectedRows;
  },
};

export { ScheduleRepository };
