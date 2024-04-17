import {
  CreateMovieRequest,
  CreateMovieResponse,
  DeleteMovieRequest,
  DeleteMovieResponse,
  UpdateMovieRequest,
  UpdateMovieResponse,
} from "../models/movie-model";
import { MovieRepository } from "../repositories/movie-repository";

const MovieService = {
  createMovie: async (
    createMovieRequest: CreateMovieRequest
  ): Promise<CreateMovieResponse> => {
    const createdMovieId = await MovieRepository.createMovie({
      title: createMovieRequest.title,
      director: createMovieRequest.director,
      release_date: createMovieRequest.release_date,
      runtime: createMovieRequest.runtime,
      movie_status: createMovieRequest.movie_status,
      showtimes: createMovieRequest.showtimes,
    });

    return {
      id: createdMovieId,
    };
  },
  deleteMovie: async (
    deleteMovieRequest: DeleteMovieRequest
  ): Promise<DeleteMovieResponse> => {
    const deletedMovieId = await MovieRepository.deleteMovie({
      id: deleteMovieRequest.id,
    });

    return {
      id: deletedMovieId,
    };
  },
  updateMovie: async (
    updateMovieRequest: UpdateMovieRequest
  ): Promise<UpdateMovieResponse> => {
    const updatedMovieId = await MovieRepository.updateMovie({
      movie_id: updateMovieRequest.movie_id,
      title: updateMovieRequest.title,
      director: updateMovieRequest.director,
      release_date: updateMovieRequest.release_date,
      runtime: updateMovieRequest.runtime,
      movie_status: updateMovieRequest.movie_status,
      showtimes: updateMovieRequest.showtimes,
    });

    return {
      id: updatedMovieId,
    };
  },
};

export { MovieService };
