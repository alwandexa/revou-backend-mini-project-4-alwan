export interface ShowtimeModel {
  movie_id: number;
  time: string;
}

export interface CreateShowtimeRequest {
  movie_id: number;
  showtimes: string[];
}

export interface DeleteShowtimeRequest {
  movie_id: number;
}

export interface DeleteShowtimeResponse {
  movie_id: number;
}
