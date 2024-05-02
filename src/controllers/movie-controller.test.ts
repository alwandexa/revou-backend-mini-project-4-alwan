// import { authMiddleware } from "../middlewares/authorization";

import { NextFunction } from "express";
import app from "../app";

import request from "supertest";
import dayjs from "dayjs";

const now: Date = new Date();
const formattedNow = dayjs(now).format("YYYY-MM-DD HH:mm:ss");

jest.mock("../middlewares/authorization", () => ({
  ...jest.requireActual("../middlewares/authorization"),
  authMiddleware: jest.fn(() => {
    return jest.fn();
  }),
}));
jest.mock("../utils/util", () => ({
  ...jest.requireActual("../utils/util"),
  onSuccess: jest.fn((res, data, message, statusCode) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: formattedNow,
    });
  }),
  onError: jest.fn((res, message) => {
    return res.status(200).json({
      success: false,
      message,
      timestamp: formattedNow,
    });
  }),
}));

describe("Movie Controller", () => {
  it("Create movie", async () => {
    const res = await request(app).post("/movie/add").send({
      title: "Siksa Kubur",
      director: "Joko Anwar",
      release_date: "2024-04-12",
      runtime: 120,
      movie_status: "showing",
    });

    expect(res.body).toHaveProperty("success");
    expect(res.statusCode).toEqual(201);
  });

  it("Get movie", async () => {
    const res = await request(app).get("/movie/list");

    expect(res.body).toHaveProperty("success");
    expect(res.body).toHaveProperty("data");
    expect(res.statusCode).toEqual(200);
  });
});
