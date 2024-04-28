import { Request, Response } from "express";

import {
  CreateMovieRequest,
  DeleteMovieRequest,
  GetMovieDetailRequest,
  UpdateMovieRequest,
} from "../models/movie-model";
import { MovieService } from "../services/movie-service";
import { onError, onSuccess } from "../utils/util";
import { pool } from "../lib/database";

const MovieController = {
  createMovie: async (req: Request, res: Response) => {
    const connection = await pool.getConnection();

    try {
      const createMovieRequest = req.body as CreateMovieRequest;
      const createMovieResponse = await MovieService.createMovie(
        createMovieRequest,
        connection
      );

      onSuccess(
        res,
        createMovieResponse,
        "Successfully created",
        201,
        connection
      );
    } catch (error: any) {
      onError(res, error.message, connection);
    }
  },
  getAllMovies: async (req: Request, res: Response) => {
    const connection = await pool.getConnection();

    try {
      const getAllMoviesResponse = await MovieService.getAllMovies(connection);

      onSuccess(
        res,
        getAllMoviesResponse,
        "Successfully fetched",
        200,
        connection
      );
    } catch (error: any) {
      onError(res, error.message, connection);
    }
  },
  getMovieById: async (req: Request, res: Response) => {
    const connection = await pool.getConnection();

    try {
      const getMovieRequest = req.body as GetMovieDetailRequest;
      const getMovieResponse = await MovieService.getMovieById(
        getMovieRequest,
        connection
      );

      onSuccess(res, getMovieResponse, "Successfully fetched", 200, connection);
    } catch (error: any) {
      onError(res, error.message, connection);
    }
  },
  deleteMovie: async (req: Request, res: Response) => {
    const connection = await pool.getConnection();

    try {
      const deleteMovieRequest = req.body as DeleteMovieRequest;
      const deleteMovieResponse = await MovieService.deleteMovie(
        deleteMovieRequest,
        connection
      );

      onSuccess(
        res,
        deleteMovieResponse,
        "Successfully deleted",
        200,
        connection
      );
    } catch (error: any) {
      onError(res, error.message, connection);
    }
  },
  updateMovie: async (req: Request, res: Response) => {
    const connection = await pool.getConnection();

    try {
      const updateMovieRequest = req.body as UpdateMovieRequest;
      const updateMovieResponse = await MovieService.updateMovie(
        updateMovieRequest,
        connection
      );

      onSuccess(
        res,
        updateMovieResponse,
        "Successfully updated",
        200,
        connection
      );
    } catch (error: any) {
      onError(res, error.message, connection);
    }
  },
};

export { MovieController };
