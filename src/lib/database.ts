import mysql from "mysql2";

// export const mysqlConnection = () => {
//   return new Promise<mysql.Connection>((resolve, reject) => {
//     const connection = mysql.createConnection({
//       host: "localhost",
//       port: 3306,
//       user: "root",
//       password: "root",
//       database: "revou",
//     });

//     connection.connect((error) => {
//       if (error) {
//         reject(error);
//         return;
//       }

//       resolve(connection);
//     });
//   });
// };

export const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "miniRevouRest",
});
