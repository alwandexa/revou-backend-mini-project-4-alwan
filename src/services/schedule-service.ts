import { PoolConnection } from "mysql2/promise";

import {
  CreateScheduleRequest,
  CreateScheduleResponse,
  DeleteScheduleRequest,
  DeleteScheduleResponse,
  GetScheduleResponse,
  UpdateScheduleRequest,
  UpdateScheduleResponse,
} from "../models/schedule-model";
import { ScheduleRepository } from "../repositories/schedule-repository";
import { MovieRepository } from "../repositories/movie-repository";
import { validateRequiredKeys } from "../utils/util";

const validateShowtime = (
  existingShowtimes: string[],
  newShowtime: string,
  movieDuration: number
): boolean => {
  const parseTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const newShowtimeMinutes = parseTime(newShowtime);
  const movieDurationHours = Math.floor(movieDuration / 60);
  const movieDurationMinutes = movieDuration % 60;
  const newShowtimeEndMinutes = newShowtimeMinutes + movieDuration;

  for (const existingShowtime of existingShowtimes) {
    const existingShowtimeMinutes = parseTime(existingShowtime);
    const existingShowtimeEndMinutes =
      existingShowtimeMinutes + movieDurationHours * 60 + movieDurationMinutes;

    if (
      (newShowtimeMinutes >= existingShowtimeMinutes &&
        newShowtimeMinutes < existingShowtimeEndMinutes) ||
      (newShowtimeEndMinutes > existingShowtimeMinutes &&
        newShowtimeEndMinutes <= existingShowtimeEndMinutes)
    ) {
      // Overlap detected
      return false;
    }
  }

  // No overlap
  return true;
};

const ScheduleService = {
  createSchedule: async (
    createScheduleRequest: CreateScheduleRequest,
    connection: PoolConnection
  ): Promise<CreateScheduleResponse> => {
    validateRequiredKeys(createScheduleRequest, [
      "movie_id",
      "studio_id",
      "showtime",
      "showdate",
    ]);
    const movie = await MovieRepository.getMovieById(
      { movie_id: createScheduleRequest.movie_id },
      connection
    );

    const showtimes = await ScheduleRepository.getShowtimes(
      {
        studio_id: createScheduleRequest.studio_id,
        showdate: createScheduleRequest.showdate,
      },
      connection
    );

    if (
      !validateShowtime(
        showtimes,
        createScheduleRequest.showtime,
        movie.runtime
      )
    ) {
      throw Error("Schedule Overlapped");
    }

    const createdScheduleId = await ScheduleRepository.createSchedule(
      createScheduleRequest,
      connection
    );

    return {
      schedule_id: createdScheduleId.insertId,
    };
  },
  updateSchedule: async (
    createScheduleRequest: UpdateScheduleRequest,
    connection: PoolConnection
  ): Promise<UpdateScheduleResponse> => {
    const affectedRowsCount = await ScheduleRepository.updateSchedule(
      createScheduleRequest,
      connection
    );

    return {
      affectedRowsCount: affectedRowsCount,
    };
  },
  deleteSchedule: async (
    deleteScheduleRequest: DeleteScheduleRequest,
    connection: PoolConnection
  ): Promise<DeleteScheduleResponse> => {
    const affectedRowsCount = await ScheduleRepository.deleteSchedule(
      deleteScheduleRequest,
      connection
    );

    if (affectedRowsCount === 0) {
      throw new Error("Schedule not found");
    }

    return {
      affectedRowsCount: affectedRowsCount,
    };
  },
  getSchedules: async (
    connection: PoolConnection
  ): Promise<GetScheduleResponse[]> => {
    const schedule = await ScheduleRepository.getAllSchedule(connection);

    if (!schedule) {
      throw new Error("Schedule not found");
    }

    return schedule;
  },
};

export { ScheduleService };
