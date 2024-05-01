import { ResultSetHeader } from "mysql2";
import { PoolConnection, RowDataPacket } from "mysql2/promise";

import {
  CreateScheduleRequest,
  DeleteScheduleRequest,
  GetLastShowtimeRequest,
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

    if (result[0].affectedRows === 0) {
      throw new Error("Schedule not found");
    }

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
  getScheduleById: async (schedule_id: number, connection: PoolConnection) => {
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
    s2.studio_id = s.studio_id
  where s.schedule_id = ${schedule_id}`;

    const [rows] = await connection.query<RowDataPacket[]>(query);

    if (rows.length === 0) {
      throw new Error("Schedule not found");
    }

    return rows[0];
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
    s2.studio_id = s.studio_id
  where s.deleted_at IS NULL`;

    const [rows] = await connection.query<RowDataPacket[]>(query);

    const result: GetScheduleResponse[] = rows.map((value) => ({
      schedule_id: value.schedule_id,
      title: value.title,
      runtime: value.runtime,
      studio_name: value.studio_name,
      showtime: value.showtime,
      showdate: value.showdate,
    }));

    return result;
  },
  lockSchedule: async (schedule_id: number, connection: PoolConnection) => {
    const query = `SELECT schedule_id, studio_id FROM schedules WHERE schedule_id = ${schedule_id} FOR UPDATE`;

    const [rows] = await connection.query<RowDataPacket[]>(query);

    if (rows.length === 0) {
      throw new Error("Schedule not found");
    }

    return rows[0];
  },
  getShowtimes: async (
    getLastShowtimeRequest: GetLastShowtimeRequest,
    connection: PoolConnection
  ) => {
    const query = `select TIME_FORMAT(showtime, '%H:%i') as showtime from schedules s WHERE studio_id = ${getLastShowtimeRequest.studio_id} AND showdate = '${getLastShowtimeRequest.showdate}' ORDER BY showtime`;

    const [rows] = await connection.query<RowDataPacket[]>(query);

    const result = rows.map((value) => {
      return value.showtime;
    });

    return result;
  },
};

export { ScheduleRepository };
