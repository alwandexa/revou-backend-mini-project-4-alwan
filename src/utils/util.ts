import dayjs from "dayjs";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { PoolConnection } from "mysql2/promise";

export const generateJwtToken = (userId: number): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const currentDate = new Date();
    const fiveMinutesLater = currentDate.setMinutes(
      currentDate.getMinutes() + 5
    );

    const payload = {
      sub: userId,
      exp: Math.floor(fiveMinutesLater / 1000),
    };

    jwt.sign(payload, "1jdsij098_123.pwerj", (err, token) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(token as string);
    });
  });
};

export const verifyJwtToken = (token: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    jwt.verify(token, "1jdsij098_123.pwerj", (err, payload) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(payload);
    });
  });
};

export const onError = (
  res: Response,
  message: string,
  connection?: PoolConnection
) => {
  if (connection) {
    connection.rollback();
    connection.release();
  }

  res.contentType("application/json").status(200);
  res.json({
    sucesss: false,
    message: message,
    timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  });
};

export const onSuccess = (
  res: Response,
  data: any,
  message: string,
  status: number = 200,
  connection?: PoolConnection
) => {
  if (connection) {
    connection.commit();
    connection.release();
  }

  res.contentType("application/json").status(status);
  res.json({
    success: true,
    data: data,
    message: message,
    timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  });
};
