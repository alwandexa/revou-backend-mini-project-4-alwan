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
};

export { UserRepository };
