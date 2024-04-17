import { Request, Response } from "express";

import { CreateMovieRequest } from "../models/movie-model";
import { MovieService } from "../services/movie-service";

const MovieController = {
  createMovie: async (req: Request, res: Response) => {
    try {
      const createMovieRequest = req.body as CreateMovieRequest;
      const createMovieResponse = await MovieService.createMovie(
        createMovieRequest
      );

      res.status(200).json({
        data: createMovieResponse,
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
