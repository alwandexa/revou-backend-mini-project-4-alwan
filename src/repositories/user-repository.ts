import { QueryError, ResultSetHeader } from "mysql2";

import { CreateUserRequest, UserModel } from "../models/user-model";
import { pool } from "../lib/database";

const UserRepository = {
  createUser: (userModel: CreateUserRequest) => {
    return new Promise<number>((resolve, reject) => {
      const query = `INSERT INTO users(email, password, name) values('${userModel.email}', '${userModel.password}', '${userModel.name}')`;

      pool.query(query, (err: QueryError, rows: ResultSetHeader) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(rows.insertId);
      });
    });
  },
  getByEmail: (email: string) => {
    return new Promise<UserModel>((resolve, reject) => {
      const query = `SELECT * FROM users where email = '${email}'`;

      pool.query(query, (err: QueryError, rows: any) => {
        if (err) {
          reject(err);
          return;
        }

        if (rows.length == 0) {
          reject(new Error("data not found"));
          return;
        }

        resolve({
          user_id: rows[0].id,
          email: rows[0].email,
          password: rows[0].password,
          name: rows[0].name,
          birthdate: rows[0].birthdate,
        });
      });
    });
  },
};

export { UserRepository };
