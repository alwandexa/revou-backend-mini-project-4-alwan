import { Request, Response } from "express";

import { onError, onSuccess } from "../utils/util";
import { pool } from "../lib/database";
import {
  CreateStudioRequest,
  DeleteStudioRequest,
  UpdateStudioRequest,
} from "../models/studio-model";
import { StudioService } from "../services/studio-service";

const StudioController = {
  createStudio: async (req: Request, res: Response) => {
    const connection = await pool.getConnection();

    try {
      const createStudioRequest = req.body as CreateStudioRequest;
      const createStudioResponse = await StudioService.createStudio(
        createStudioRequest,
        connection
      );

      onSuccess(
        res,
        createStudioResponse,
        "Successfully created",
        201,
        connection
      );
    } catch (error: any) {
      onError(res, error.message, connection);
    }
  },
  updateStudio: async (req: Request, res: Response) => {
    const connection = await pool.getConnection();

    try {
      const updateStudioRequest = req.body as UpdateStudioRequest;
      const updateStudioResponse = await StudioService.updateStudio(
        updateStudioRequest,
        connection
      );

      onSuccess(
        res,
        updateStudioResponse,
        "Successfully updated",
        200,
        connection
      );
    } catch (error: any) {
      onError(res, error.message, connection);
    }
  },
  deleteStudio: async (req: Request, res: Response) => {
    const connection = await pool.getConnection();

    try {
      const deleteStudioRequest = req.body as DeleteStudioRequest;
      const deleteStudioResponse = await StudioService.deleteStudio(
        deleteStudioRequest,
        connection
      );

      onSuccess(
        res,
        deleteStudioResponse,
        "Successfully deleted",
        200,
        connection
      );
    } catch (error: any) {
      onError(res, error.message, connection);
    }
  },
};

export { StudioController };
