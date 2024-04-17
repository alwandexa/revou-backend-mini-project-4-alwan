import { ResultSetHeader } from "mysql2";

import { pool } from "../lib/database";
import { MovieModel } from "../models/movie-model";

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
};

export { MovieRepository };
