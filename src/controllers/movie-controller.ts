import { Request, Response } from "express";

import { CreateMovieRequest, DeleteMovieRequest } from "../models/movie-model";
import { MovieService } from "../services/movie-service";

const MovieController = {
  createMovie: async (req: Request, res: Response) => {
    try {
      const createMovieRequest = req.body as CreateMovieRequest;
      const createMovieResponse = await MovieService.createMovie(
        createMovieRequest
      );

      res.status(201).json({
        success: true,
        data: createMovieResponse,
        message: "successfully created",
      });
    } catch (error) {
      let errorMessage = "server error";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      res.status(500).json({
        success: true,
        error: errorMessage,
      });
    }
  },
  deleteMovie: async (req: Request, res: Response) => {
    try {
      const deleteMovieRequest = req.body as DeleteMovieRequest;
      const deleteMovieResponse = await MovieService.deleteMovie(
        deleteMovieRequest
      );

      res.status(200).json({
        success: true,
        data: deleteMovieResponse,
        message: "successfully deleted",
      });
    } catch (error) {
      let errorMessage = "server error";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      res.status(500).json({
        error: errorMessage,
      });
    }
  },
};

export { MovieController };
