export interface MovieModel {
  title: string;
  director: string;
  release_date: Date;
  runtime: number;
  movie_status: string;
  showtimes: Array<string>;
}

export interface CreateMovieRequest extends MovieModel {
  genres: Array<string>;
}

export interface CreateMovieResponse {
  id: number;
}

export interface DeleteMovieRequest {
  id: number;
}

export interface DeleteMovieResponse {
  id: number;
}

export interface UpdateMovieRequest extends MovieModel {
  movie_id: number;
}

export interface UpdateMovieResponse {
  id: number;
}

export interface GetMovieDetailRequest {
  movie_id: number;
}

export interface GetMovieDetailResponse extends MovieModel {}
