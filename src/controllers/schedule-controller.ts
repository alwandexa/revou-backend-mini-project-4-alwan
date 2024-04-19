import { Request, Response } from "express";
import { CreateScheduleRequest } from "../models/schedule-model";
import { ScheduleService } from "../services/schedule-service";
import { onError, onSuccess } from "../utils/util";
import { pool } from "../lib/database";

const ScheduleController = {
  createSchedule: async (req: Request, res: Response) => {
    const connection = await pool.getConnection();

    try {
      const createScheduleRequest = req.body as CreateScheduleRequest;
      const createScheduleResponse = await ScheduleService.createSchedule(
        createScheduleRequest, connection
      );

      onSuccess(res, createScheduleResponse, "Successfully created", 201);
    } catch (error: any) {
      onError(res, error.message);
    }
  },
};

export { ScheduleController };
