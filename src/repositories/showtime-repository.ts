import { ResultSetHeader } from "mysql2";

import { pool } from "../lib/database";
import {
  CreateShowtimeRequest,
  DeleteShowtimeRequest,
  DeleteShowtimeResponse,
} from "../models/showtime-model";

const ShowtimeRepository = {
  createShowtime: (
    createShowtimeRequest: CreateShowtimeRequest
  ): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      let query = `INSERT INTO showtimes(movie_id, showtime) VALUES`;

      let data = ``;

      createShowtimeRequest.showtimes.forEach((value, index) => {
        data += `(${createShowtimeRequest.movie_id} , '${value}')`;

        if (index < createShowtimeRequest.showtimes.length - 1) {
          data += `,`;
        }
      });

      pool.query<ResultSetHeader>(query + data, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(rows.insertId);
      });
    });
  },
  deleteShowtime: (
    deleteShowtimeRequest: DeleteShowtimeRequest
  ): Promise<DeleteShowtimeResponse> => {
    return new Promise<DeleteShowtimeResponse>((resolve, reject) => {
      const query = `DELETE FROM showtimes WHERE movie_id = ${deleteShowtimeRequest.movie_id}`;

      pool.query<ResultSetHeader>(query, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }

        resolve({
          movie_id: rows.insertId,
        });
      });
    });
  },
};

export { ShowtimeRepository };
