import { Request, Response } from "express";
import {
  CreateScheduleRequest,
  DeleteScheduleRequest,
  UpdateScheduleRequest,
} from "../models/schedule-model";
import { ScheduleService } from "../services/schedule-service";
import { onError, onSuccess } from "../utils/util";
import { pool } from "../lib/database";

const ScheduleController = {
  createSchedule: async (req: Request, res: Response) => {
    const connection = await pool.getConnection();

    try {
      const createScheduleRequest = req.body as CreateScheduleRequest;
      const createScheduleResponse = await ScheduleService.createSchedule(
        createScheduleRequest,
        connection
      );

      onSuccess(
        res,
        createScheduleResponse,
        "Successfully created",
        201,
        connection
      );
    } catch (error: any) {
      onError(res, error.message, connection);
    }
  },
  updateSchedule: async (req: Request, res: Response) => {
    const connection = await pool.getConnection();

    try {
      const updateScheduleRequest = req.body as UpdateScheduleRequest;
      const updateScheduleResponse = await ScheduleService.updateSchedule(
        updateScheduleRequest,
        connection
      );

      onSuccess(
        res,
        updateScheduleResponse,
        "Successfully updated",
        200,
        connection
      );
    } catch (error: any) {
      onError(res, error.message, connection);
    }
  },
  deleteSchedule: async (req: Request, res: Response) => {
    const connection = await pool.getConnection();

    try {
      const deleteScheduleRequest = req.body as DeleteScheduleRequest;
      const deleteScheduleResponse = await ScheduleService.deleteSchedule(
        deleteScheduleRequest,
        connection
      );

      onSuccess(
        res,
        deleteScheduleResponse,
        "Successfully deleted",
        200,
        connection
      );
    } catch (error: any) {
      onError(res, error.message, connection);
    }
  },
  getSchedules: async (req: Request, res: Response) => {
    const connection = await pool.getConnection();

    try {
      const getSchedulesResponse = await ScheduleService.getSchedules(
        connection
      );

      onSuccess(
        res,
        getSchedulesResponse,
        "Successfully fetched",
        200,
        connection
      );
    } catch (error: any) {
      onError(res, error.message, connection);
    }
  },
};

export { ScheduleController };
