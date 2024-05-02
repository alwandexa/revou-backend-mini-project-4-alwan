import { Request, Response } from "express";
import { Mocked } from "jest-mock";
import dayjs from "dayjs";

import { ScheduleController } from "./schedule-controller";
import {
  CreateScheduleRequest,
  DeleteScheduleRequest,
} from "../models/schedule-model";
import { ScheduleService } from "../services/schedule-service";
import { pool as Pool } from "../lib/database";

const now: Date = new Date();
const formattedNow = dayjs(now).format("YYYY-MM-DD HH:mm:ss");

jest.mock("../services/schedule-service");
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

describe("ScheduleController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockConnection: Partial<Mocked<any>>;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      contentType: jest.fn(),
    };
    mockConnection = {
      query: jest.fn(),
      release: jest.fn(),
    } as Partial<Mocked<any>>;
    (Pool.getConnection as jest.Mock).mockResolvedValue(mockConnection);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createSchedule", () => {
    mockRequest = {
      body: {
        movie_id: 1,
        studio_id: 1,
        showtime: "18:30",
        showdate: "2024-01-02",
      } as CreateScheduleRequest,
    };

    it("should create a schedule successfully", async () => {
      const mockCreateScheduleResponse = {
        schedule_id: 1,
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
        success: true,
        timestamp: formattedNow,
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
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: mockError.message,
        timestamp: formattedNow,
      });
    });
  });

  describe("deleteSchedule", () => {
    mockRequest = {
      body: {
        schedule_id: 1,
      } as DeleteScheduleRequest,
    };

    it("should delete a schedule successfully", async () => {
      const mockServiceResponse = {
        affectedRowsCount: 1,
      };
      (ScheduleService.deleteSchedule as jest.Mock).mockResolvedValue(
        mockServiceResponse
      );

      await ScheduleController.deleteSchedule(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(ScheduleService.deleteSchedule).toHaveBeenCalledWith(
        mockRequest.body,
        mockConnection
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it("should handle errors when deleting a schedule", async () => {
      const mockError = new Error("Failed to create schedule");
      (ScheduleService.deleteSchedule as jest.Mock).mockRejectedValue(
        mockError
      );

      await ScheduleController.deleteSchedule(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(ScheduleService.deleteSchedule).toHaveBeenCalledWith(
        mockRequest.body,
        mockConnection
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: mockError.message,
        timestamp: formattedNow,
      });
    });
  });

  describe("updateSchedule", () => {
    mockRequest = {
      body: {
        schedule_id: 1,
      } as DeleteScheduleRequest,
    };

    it("should update a schedule successfully", async () => {
      const mockServiceResponse = {
        affectedRowsCount: 1,
      };
      (ScheduleService.updateSchedule as jest.Mock).mockResolvedValue(
        mockServiceResponse
      );

      await ScheduleController.updateSchedule(
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

    it("should handle errors when update a schedule", async () => {
      const mockError = new Error();
      (ScheduleService.updateSchedule as jest.Mock).mockRejectedValue(
        mockError
      );

      await ScheduleController.updateSchedule(
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

  describe("getSchedule", () => {
    mockRequest = {
      body: {},
    };

    it("should get all schedules successfully", async () => {
      (ScheduleService.getSchedules as jest.Mock).mockResolvedValue({});

      await ScheduleController.getSchedules(
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

    it("should handle errors when get all schedules", async () => {
      const mockError = new Error();
      (ScheduleService.getSchedules as jest.Mock).mockRejectedValue(mockError);

      await ScheduleController.getSchedules(
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
