import { ResultSetHeader } from "mysql2";
import { PoolConnection, RowDataPacket } from "mysql2/promise";

import {
  CreateScheduleRequest,
  DeleteScheduleRequest,
  GetScheduleResponse,
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
  deleteSchedule: async (
    updateScheduleRequest: DeleteScheduleRequest,
    connection: PoolConnection
  ) => {
    const query = `UPDATE schedules SET deleted_at = now() WHERE schedule_id = ${updateScheduleRequest.schedule_id}`;

    const result = await connection.query<ResultSetHeader>(query);

    return result[0].affectedRows;
  },
  getAllSchedule: async (connection: PoolConnection) => {
    const query = `SELECT DISTINCT 
    s.schedule_id,
    m.title,
    m.runtime,
    s2.name as studio_name,
    s.showtime,
    s.showdate 
  FROM
    schedules s
  inner join movies m on
    m.movie_id = s.movie_id
  inner join studio s2 on
    s2.studio_id = s.studio_id`;

    const [rows] = await connection.query<RowDataPacket[]>(query);

    const result: GetScheduleResponse[] = rows.map((value) => ({
      schedule_id : value.schedule_id,
      title: value.title,
      runtime: value.runtime,
      studio_name: value.studio_name,
      showtime: value.showtime,
      showdate: value.showdate,
    }));

    return result;
  },
};

export { ScheduleRepository };
