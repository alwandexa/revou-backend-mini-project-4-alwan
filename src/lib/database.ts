import mysql, { Pool } from "mysql2/promise";

export const pool: Pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "miniRevouRest",
});
