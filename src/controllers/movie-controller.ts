import { Request, Response } from "express";

import {
  CreateMovieRequest,
  DeleteMovieRequest,
  GetMovieDetailRequest,
  UpdateMovieRequest,
} from "../models/movie-model";
import { MovieService } from "../services/movie-service";
import { onError } from "../utils/util";
import { pool } from "../lib/database";

const MovieController = {
  createMovie: async (req: Request, res: Response) => {
    const connection = await pool.getConnection();

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
    } catch (error: any) {
      onError(res, error.message, connection);
    }
  },
  getAllMovies: async (req: Request, res: Response) => {
    const connection = await pool.getConnection();

    try {
      const getAllMoviesResponse = await MovieService.getAllMovies();

      res.status(200).json({
        success: true,
        data: getAllMoviesResponse,
        message: "successfully fetched",
      });
    } catch (error: any) {
      onError(res, error.message, connection);
    }
  },
  getMovieById: async (req: Request, res: Response) => {
    const connection = await pool.getConnection();

    try {
      const getMovieRequest = req.body as GetMovieDetailRequest;
      const getMovieResponse = await MovieService.getMovieById(getMovieRequest);

      res.status(200).json({
        success: true,
        data: getMovieResponse,
        message: "successfully fetched",
      });
    } catch (error: any) {
      onError(res, error.message, connection);
    }
  },
  deleteMovie: async (req: Request, res: Response) => {
    const connection = await pool.getConnection();

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
    } catch (error: any) {
      onError(res, error.message, connection);
    }
  },
  updateMovie: async (req: Request, res: Response) => {
    const connection = await pool.getConnection();
    
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
    } catch (error: any) {
      onError(res, error.message, connection);
    }
  },
};

export { MovieController };
