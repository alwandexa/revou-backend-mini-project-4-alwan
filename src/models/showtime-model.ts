export interface ShowtimeModel {
  movie_id: number;
  time: string;
}

export interface CreateShowtimeRequest {
  movie_id: number;
  showtimes: string[];
}
