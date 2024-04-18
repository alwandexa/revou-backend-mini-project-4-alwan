import { PoolConnection, ResultSetHeader } from "mysql2";

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
      let query = `INSERT INTO showtimes(movie_id, showtime) VALUES as`;

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
  updateShowtime: (): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      pool.getConnection((error, connection) => {
        if (error) {
          reject(error);
          return;
        }

        connection.beginTransaction((err) => {
          if (err) {
            reject(err);
            return;
          }
          connection.query(
            "DELETE FROM showtimes WHERE movie_id=1 ",
            (err, result) => {
              if (err) {
                connection.rollback(() => {
                  reject(err);
                });
                return;
              }

              connection.query(
                "INSERT INTO showtimes(movie_id, showtime) VALUES(1, '18:30' xx)",
                (err, result) => {
                  if (err) {
                    reject(err);
                    connection.rollback(() => {
                      return;
                    });
                  }
                  connection.commit((err) => {
                    if (err) {
                      connection.rollback(() => {
                        reject(err);
                        return;
                      });
                    }
                    connection.release();
                    resolve(1);
                  });
                }
              );
            }
          );
        });
      });
    });
  },
  updateShowtime2: async (): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      pool.getConnection((error, connection) => {
        if (error) {
          reject(error);
          return;
        }
        try {
          connection.beginTransaction(async (err) => {
            if (err) {
              reject(err);
              return;
            }
          });

          connection.query("DELETE FROM showtimes WHERE movie_id=1 xxx", 
          );
          connection.query(
            "INSERT INTO showtimes(movie_id, showtime) VALUES(1, '18:30')"
          );

          connection.commit();
        } catch (err) {
          connection.rollback((err) => {
            if (err) {
              connection.rollback(() => {
                reject(err);
                return;
              });
            }
          });
          console.error("Error occurred during the transaction:", err);
        } finally {
          if (connection) {
            connection.release();
          }
        }
      });
    });
  },
};

export { ShowtimeRepository };
