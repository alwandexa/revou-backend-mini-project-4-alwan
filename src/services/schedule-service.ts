import { PoolConnection } from "mysql2/promise";

import {
  CreateScheduleRequest,
  CreateScheduleResponse,
} from "../models/schedule-model";
import { ScheduleRepository } from "../repositories/schedule-repository";

const ScheduleService = {
  createSchedule: async (
    createScheduleRequest: CreateScheduleRequest,
    connection: PoolConnection
  ): Promise<CreateScheduleResponse> => {
    const createdScheduleId = await ScheduleRepository.createSchedule(
      createScheduleRequest, connection
    );

    return {
      schedule_id: createdScheduleId.insertId,
    };
  },
};

export { ScheduleService };
