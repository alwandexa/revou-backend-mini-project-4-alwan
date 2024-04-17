import {
  CreateMovieRequest,
  CreateMovieResponse,
  DeleteMovieRequest,
  DeleteMovieResponse,
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
};

export { MovieService };
