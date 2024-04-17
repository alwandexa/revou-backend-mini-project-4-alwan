export interface MovieModel {
  title: string;
  director: string;
  release_date: Date;
  runtime: number;
  movie_status: string;
  showtimes: Array<string>;
}

export interface CreateMovieRequest {
  title: string;
  director: string;
  release_date: Date;
  runtime: number;
  genres: Array<string>;
  movie_status: string;
  showtimes: Array<string>;
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
