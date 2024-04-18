import { QueryError, ResultSetHeader, RowDataPacket } from "mysql2";

import { pool } from "../lib/database";
import {
  DeleteMovieRequest,
  GetMovieDetailRequest,
  GetMovieDetailResponse,
  MovieModel,
  UpdateMovieRequest,
  GetAllMoviesResponse,
} from "../models/movie-model";

const MovieRepository = {
  createMovie: async (movieModel: MovieModel) => {
    const query = `INSERT INTO movies(title, director, release_date, runtime, movie_status) values('${movieModel.title}', '${movieModel.director}', '${movieModel.release_date}', ${movieModel.runtime}, '${movieModel.movie_status}')`;

    const result = await pool.query<ResultSetHeader>(query);

    return result[0].insertId;
  },
  getAllMovies: async (): Promise<GetAllMoviesResponse[]> => {
    const query = "SELECT movie_id, title, director FROM movies";

    const [rows] = await pool.query<RowDataPacket[]>(query);

    const result : GetAllMoviesResponse[] = rows.map((value) => ({
      movie_id: value.movie_id,
      title: value.title,
      director: value.director,
    }));

    return result;
  },
  getMovieById: (
    getMovieByIdRequest: GetMovieDetailRequest
  ): Promise<GetMovieDetailResponse> => {
    return new Promise<GetMovieDetailResponse>((resolve, reject) => {
      const query = `select * from movies where movie_id = ${getMovieByIdRequest.movie_id}`;

      pool.query(query, (err: QueryError, rows: GetMovieDetailResponse[]) => {
        if (err) {
          reject(err);
          return;
        }

        if (rows.length === 0) {
          reject(new Error("data not found"));
          return;
        }

        const movie: GetMovieDetailResponse = {
          title: rows[0].title,
          director: rows[0].director,
          release_date: rows[0].release_date,
          runtime: rows[0].runtime,
          movie_status: rows[0].movie_status,
          showtimes: rows[0].showtimes,
        };

        resolve(movie);
      });
    });
  },
  deleteMovie: (deleteMovieRequest: DeleteMovieRequest): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      const query = `UPDATE movies SET deleted_at = now() WHERE movie_id = ${deleteMovieRequest.id}`;

      // pool.query<ResultSetHeader>(query, (err, rows) => {
      //   if (err) {
      //     reject(err);
      //     return;
      //   }

      //   resolve(rows.insertId);
      // });
    });
  },
  updateMovie: (updateMovieRequest: UpdateMovieRequest): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      const query = `UPDATE movies SET title = '${updateMovieRequest.title}', director = '${updateMovieRequest.director}', release_date = '${updateMovieRequest.release_date}', runtime = ${updateMovieRequest.runtime}, movie_status = '${updateMovieRequest.movie_status}', updated_at = now() WHERE movie_id = ${updateMovieRequest.movie_id}`;

      // pool.query<ResultSetHeader>(query, (err, rows) => {
      //   if (err) {
      //     reject(err);
      //     return;
      //   }

      //   resolve(rows.insertId);
      // });
    });
  },
};

export { MovieRepository };
