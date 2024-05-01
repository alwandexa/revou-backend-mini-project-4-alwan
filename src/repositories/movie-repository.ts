import { ResultSetHeader, RowDataPacket } from "mysql2";
import { PoolConnection } from "mysql2/promise";

import {
  DeleteMovieRequest,
  GetMovieDetailRequest,
  GetMovieDetailResponse,
  MovieModel,
  UpdateMovieRequest,
  GetAllMoviesResponse,
  CreateMovieRequest,
} from "../models/movie-model";

const MovieRepository = {
  createMovie: async (
    createMovieRequest: CreateMovieRequest,
    connection: PoolConnection
  ) => {
    const query = `INSERT INTO movies(title, director, release_date, runtime, movie_status) values('${createMovieRequest.title}', '${createMovieRequest.director}', '${createMovieRequest.release_date}', ${createMovieRequest.runtime}, '${createMovieRequest.movie_status}')`;

    const result = await connection.query<ResultSetHeader>(query);

    return result[0].insertId;
  },
  getAllMovies: async (connection: PoolConnection) => {
    const query =
      "SELECT movie_id, title, director FROM movies WHERE deleted_at IS NULL";

    const [rows] = await connection.query<RowDataPacket[]>(query);

    const result: GetAllMoviesResponse[] = rows.map((value) => ({
      movie_id: value.movie_id,
      title: value.title,
      director: value.director,
    }));

    return result;
  },
  getMovieById: async (
    getMovieByIdRequest: GetMovieDetailRequest,
    connection: PoolConnection
  ) => {
    const query = `select * from movies where movie_id = ${getMovieByIdRequest.movie_id}`;

    const [rows] = await connection.query<RowDataPacket[]>(query);

    if (rows.length === 0) {
      throw new Error("Movie not found");
    }

    return rows[0] as GetMovieDetailResponse;
  },
  deleteMovie: async (
    deleteMovieRequest: DeleteMovieRequest,
    connection: PoolConnection
  ) => {
    const query = `UPDATE movies SET deleted_at = now() WHERE movie_id = ${deleteMovieRequest.movie_id}`;

    const result = await connection.query<ResultSetHeader>(query);

    return result[0].affectedRows;
  },
  updateMovie: async (
    updateMovieRequest: UpdateMovieRequest,
    connection: PoolConnection
  ) => {
    const query = `UPDATE movies SET title = '${updateMovieRequest.title}', director = '${updateMovieRequest.director}', release_date = '${updateMovieRequest.release_date}', runtime = ${updateMovieRequest.runtime}, movie_status = '${updateMovieRequest.movie_status}', updated_at = now() WHERE movie_id = ${updateMovieRequest.movie_id}`;

    const result = await connection.query<ResultSetHeader>(query);

    return result[0].affectedRows;
  },
};

export { MovieRepository };
