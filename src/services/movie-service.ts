import { PoolConnection } from "mysql2/promise";

import {
  CreateMovieRequest,
  CreateMovieResponse,
  DeleteMovieRequest,
  DeleteMovieResponse,
  GetMovieDetailRequest,
  GetMovieDetailResponse,
  UpdateMovieRequest,
  UpdateMovieResponse,
  GetAllMoviesResponse,
} from "../models/movie-model";
import { MovieRepository } from "../repositories/movie-repository";
import { validateRequiredKeys } from "../utils/util";

const MovieService = {
  createMovie: async (
    createMovieRequest: CreateMovieRequest,
    connection: PoolConnection
  ): Promise<CreateMovieResponse> => {
    validateRequiredKeys(createMovieRequest, [
      "title",
      "director",
      "release_date",
      "runtime",
      "movie_status",
    ]);

    const createdMovieId = await MovieRepository.createMovie(
      createMovieRequest,
      connection
    );

    return {
      movie_id: createdMovieId,
    };
  },
  getAllMovies: async (
    connection: PoolConnection
  ): Promise<GetAllMoviesResponse[]> => {
    const movies = await MovieRepository.getAllMovies(connection);

    return movies;
  },
  getMovieById: async (
    getMovieByIdRequest: GetMovieDetailRequest,
    connection: PoolConnection
  ): Promise<GetMovieDetailResponse> => {
    validateRequiredKeys(getMovieByIdRequest, ["movie_id"]);

    const movie = await MovieRepository.getMovieById(
      getMovieByIdRequest,
      connection
    );

    return movie;
  },
  deleteMovie: async (
    deleteMovieRequest: DeleteMovieRequest,
    connection: PoolConnection
  ): Promise<DeleteMovieResponse> => {
    validateRequiredKeys(deleteMovieRequest, ["movie_id"]);

    const deletedMovie = await MovieRepository.deleteMovie(
      deleteMovieRequest,
      connection
    );

    return {
      affectedRowsCount: deletedMovie,
    };
  },
  updateMovie: async (
    updateMovieRequest: UpdateMovieRequest,
    connection: PoolConnection
  ): Promise<UpdateMovieResponse> => {
    validateRequiredKeys(updateMovieRequest, [
      "movie_id",
      "title",
      "director",
      "release_date",
      "runtime",
      "movie_status",
    ]);

    const updatedMovie = await MovieRepository.updateMovie(
      updateMovieRequest,
      connection
    );

    return {
      affectedRowsCount: updatedMovie,
    };
  },
};

export { MovieService };
