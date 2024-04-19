import { Request, Response } from "express";
import { ScheduleController } from "./schedule-controller";
import { CreateScheduleRequest } from "../models/schedule-model";
import { ScheduleService } from "../services/schedule-service";
import { pool as Pool } from "../lib/database";
import { Mocked } from 'jest-mock';

jest.mock("../services/schedule-service");
jest.mock("../lib/database");

describe("ScheduleController xxx", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockConnection: Partial<Mocked<any>>;

  beforeEach(() => {
    mockRequest = {
      body: {
        movie_id: 1,
        studio_id: 1,
        showtime: "18:30",
        show_date: new Date(),
      } as CreateScheduleRequest,
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockConnection = {
      // Mock the connection object methods if needed
      query: jest.fn(),
      release: jest.fn(),
      // ...
    } as Partial<Mocked<any>>;
    (Pool.getConnection as jest.Mock).mockResolvedValue(mockConnection);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("createSchedule", () => {
    it("should create a schedule successfully", async () => {
      const mockCreateScheduleResponse = {
        schedule_id: jest.fn(() => 1),
      };
      (ScheduleService.createSchedule as jest.Mock).mockResolvedValue(
        mockCreateScheduleResponse
      );

      await ScheduleController.createSchedule(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(ScheduleService.createSchedule).toHaveBeenCalledWith(
        mockRequest.body,
        mockConnection
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockCreateScheduleResponse,
        message: "Successfully created",
      });
    });

    it("should handle errors when creating a schedule", async () => {
      const mockError = new Error("Failed to create schedule");
      (ScheduleService.createSchedule as jest.Mock).mockRejectedValue(
        mockError
      );

      await ScheduleController.createSchedule(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(ScheduleService.createSchedule).toHaveBeenCalledWith(
        mockRequest.body,
        mockConnection
      );
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: mockError.message,
      });
    });
  });
});
