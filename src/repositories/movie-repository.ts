import { ResultSetHeader } from "mysql2";

import { pool } from "../lib/database";
import {
  DeleteMovieRequest,
  MovieModel,
  UpdateMovieRequest,
} from "../models/movie-model";

const MovieRepository = {
  createMovie: (movieModel: MovieModel): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      const query = `INSERT INTO movies(title, director, release_date, runtime, movie_status) values('${movieModel.title}', '${movieModel.director}', '${movieModel.release_date}', ${movieModel.runtime}, '${movieModel.movie_status}')`;

      pool.query<ResultSetHeader>(query, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(rows.insertId);
      });
    });
  },
  deleteMovie: (deleteMovieRequest: DeleteMovieRequest): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      const query = `UPDATE movies SET deleted_at = now() WHERE movie_id = ${deleteMovieRequest.id}`;

      pool.query<ResultSetHeader>(query, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(rows.insertId);
      });
    });
  },
  updateMovie: (updateMovieRequest: UpdateMovieRequest): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      const query = `UPDATE movies SET title = '${updateMovieRequest.title}', director = '${updateMovieRequest.director}', release_date = '${updateMovieRequest.release_date}', runtime = ${updateMovieRequest.runtime}, movie_status = '${updateMovieRequest.movie_status}', updated_at = now() WHERE movie_id = ${updateMovieRequest.movie_id}`;

      pool.query<ResultSetHeader>(query, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(rows.insertId);
      });
    });
  },
};

export { MovieRepository };
