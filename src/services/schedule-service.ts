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

const ScheduleService = {
  createSchedule: async (
    createScheduleRequest: CreateScheduleRequest,
    connection: PoolConnection
  ): Promise<CreateScheduleResponse> => {
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

    if (affectedRowsCount === 0) {
      throw new Error("Schedule not found");
    }

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
