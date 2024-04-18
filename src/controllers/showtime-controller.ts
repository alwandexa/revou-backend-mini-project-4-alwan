import { Request, Response } from "express";

import { CreateShowtimeRequest } from "../models/showtime-model";
import { ShowtimeService } from "../services/showtime-service";

const ShowtimeController = {
  createShowtime: async (req: Request, res: Response) => {
    try {
      const createShowtimeRequest = req.body as CreateShowtimeRequest;
      const createShowtimeResponse = await ShowtimeService.createShowtime(
        createShowtimeRequest
      );

      res.status(201).json({
        success: true,
        data: createShowtimeResponse,
        message: "successfully created",
      });
    } catch (error) {
      let errorMessage = "server error";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      res.status(500).json({
        success: false,
        error: errorMessage,
      });
    }
  },
  updateShowtime: async (req: Request, res: Response) => {
    try {
      const createShowtimeResponse = await ShowtimeService.updateShowtime();

      res.status(200).json({
        success: true,
        data: createShowtimeResponse,
        message: "successfully updated",
      });
    } catch (error) {
      let errorMessage = "server error";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      res.status(500).json({
        success: false,
        error: errorMessage,
      });
    }
  },
};

export { ShowtimeController };
