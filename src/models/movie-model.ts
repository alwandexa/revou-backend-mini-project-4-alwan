export interface MovieModel {
  movie_id: number;
  title: string;
  director: string;
  release_date: Date;
  runtime: number;
  movie_status: string;
}

export interface CreateMovieRequest extends Omit<MovieModel, "movie_id"> {}

export interface CreateMovieResponse extends Pick<MovieModel, "movie_id"> {}

export interface DeleteMovieRequest extends Pick<MovieModel, "movie_id"> {}

export interface DeleteMovieResponse {
  affectedRowsCount: number;
}

export interface UpdateMovieRequest extends MovieModel {}

export interface UpdateMovieResponse {
  affectedRowsCount: number;
}

export interface GetMovieDetailRequest extends Pick<MovieModel, "movie_id"> {}

export interface GetMovieDetailResponse extends MovieModel {}

export interface GetAllMoviesResponse
  extends Pick<MovieModel, "movie_id" | "title" | "director"> {}
