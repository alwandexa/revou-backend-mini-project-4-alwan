import { Request, Response } from "express";
import dayjs from "dayjs";

import { MovieController } from "./movie-controller";
import { MovieService } from "../services/movie-service";
import { CreateMovieRequest } from "../models/movie-model";

const now: Date = new Date();
const formattedNow = dayjs(now).format("YYYY-MM-DD HH:mm:ss");

jest.mock("../services/movie-service");
jest.mock("../lib/database");
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
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      contentType: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Create movie", () => {
    it("should create a movie successfully", async () => {
      mockRequest = {
        body: {
          title: "as",
          director: "as",
          release_date: new Date(),
          runtime: 120,
          movie_status: "as",
        } as CreateMovieRequest,
      };

      const mockServiceResponse = {
        movie_id: 1,
      };
      (MovieService.createMovie as jest.Mock).mockResolvedValue(
        mockServiceResponse
      );

      await MovieController.createMovie(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: expect.any(String),
          data: expect.any(Object),
          timestamp: expect.any(String),
        })
      );
    });

    it("should handle errors when create movie", async () => {
      const mockError = new Error();
      (MovieService.createMovie as jest.Mock).mockRejectedValue(mockError);

      await MovieController.createMovie(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: expect.any(String),
          timestamp: expect.any(String),
        })
      );
    });
  });

  describe("Get all movie", () => {
    it("should get all movie successfully", async () => {
      mockRequest = {};

      (MovieService.getAllMovies as jest.Mock).mockResolvedValue({});

      await MovieController.getAllMovies(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: expect.any(String),
          data: expect.any(Object),
          timestamp: expect.any(String),
        })
      );
    });

    it("should handle errors when create movie", async () => {
      const mockError = new Error();
      (MovieService.getAllMovies as jest.Mock).mockRejectedValue(mockError);

      await MovieController.getAllMovies(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: expect.any(String),
          timestamp: expect.any(String),
        })
      );
    });
  });

  describe("Delete movie", () => {
    it("should delete movie successfully", async () => {
      mockRequest = {};

      (MovieService.deleteMovie as jest.Mock).mockResolvedValue({});

      await MovieController.deleteMovie(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: expect.any(String),
          data: expect.any(Object),
          timestamp: expect.any(String),
        })
      );
    });

    it("should handle errors when create movie", async () => {
      const mockError = new Error();
      (MovieService.getAllMovies as jest.Mock).mockRejectedValue(mockError);

      await MovieController.getAllMovies(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: expect.any(String),
          timestamp: expect.any(String),
        })
      );
    });
  });
});
