import { Request, Response } from "express";
import { CreateScheduleRequest, UpdateScheduleRequest } from "../models/schedule-model";
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
  updateSchedule: async (req: Request, res: Response) => {
    const connection = await pool.getConnection();

    try {
      const updateScheduleRequest = req.body as UpdateScheduleRequest;
      const updateScheduleResponse = await ScheduleService.updateSchedule(
        updateScheduleRequest, connection
      );

      onSuccess(res, updateScheduleResponse, "Successfully updated", 201);
    } catch (error: any) {
      onError(res, error.message);
    }
  },
};

export { ScheduleController };
