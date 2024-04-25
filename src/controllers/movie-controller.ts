import { Request, Response } from "express";

import {
  CreateMovieRequest,
  DeleteMovieRequest,
  GetMovieDetailRequest,
  UpdateMovieRequest,
} from "../models/movie-model";
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
  getAllMovies: async (req: Request, res: Response) => {
    try {
      const getAllMoviesResponse = await MovieService.getAllMovies();

      res.status(200).json({
        success: true,
        data: getAllMoviesResponse,
        message: "successfully fetched",
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
  getMovieById: async (req: Request, res: Response) => {
    try {
      const getMovieRequest = req.body as GetMovieDetailRequest;
      const getMovieResponse = await MovieService.getMovieById(getMovieRequest);

      res.status(200).json({
        success: true,
        data: getMovieResponse,
        message: "successfully fetched",
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
  updateMovie: async (req: Request, res: Response) => {
    try {
      const updateMovieRequest = req.body as UpdateMovieRequest;
      const updateMovieResponse = await MovieService.updateMovie(
        updateMovieRequest
      );

      res.status(200).json({
        success: true,
        data: updateMovieResponse,
        message: "successfully updated",
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
