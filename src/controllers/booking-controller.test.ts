import { Request, Response } from "express";
import { Mocked } from "jest-mock";
import dayjs from "dayjs";

import { BookingController } from "./booking-controller";
import { BookingService } from "../services/booking-service";
import { pool as Pool } from "../lib/database";
import { CreateBookingRequest } from "../models/booking-model";

const now: Date = new Date();
const formattedNow = dayjs(now).format("YYYY-MM-DD HH:mm:ss");

jest.mock("../services/booking-service");
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
  verifyJwtToken: jest.fn().mockResolvedValue({ sub: 1 }),
}));

describe("BookingController", () => {
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
      beginTransaction: jest.fn(),
    } as Partial<Mocked<any>>;
    (Pool.getConnection as jest.Mock).mockResolvedValue(mockConnection);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Create booking", () => {
    mockRequest = {
      headers: {
        authorization: "Bearer token",
      },
      body: {
        user_id: 1,
        schedule_id: 1,
        amount: 10,
      } as CreateBookingRequest,
    };

    it("should create a booking successfully", async () => {
      const mockServiceResponse = {
        booking_id: 1,
      };
      (BookingService.create as jest.Mock).mockResolvedValue(
        mockServiceResponse
      );

      await BookingController.createBooking(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockServiceResponse,
        message: "Successfully created",
        success: true,
        timestamp: formattedNow,
      });
    });

    it("should handle errors when creating a schedule", async () => {
      const mockError = new Error("Failed to create schedule");
      (BookingService.create as jest.Mock).mockRejectedValue(mockError);

      await BookingController.createBooking(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: mockError.message,
        timestamp: formattedNow,
      });
    });
  });

  describe("Get booking", () => {
    mockRequest = {
      headers: {
        authorization: "Bearer token",
      },
      body: {
        user_id: 1,
      } as CreateBookingRequest,
    };

    it("should get all user booking successfully", async () => {
      const mockServiceResponse = {
        booking_id: 1,
      };
      (BookingService.getHistoryByUserId as jest.Mock).mockResolvedValue(
        mockServiceResponse
      );

      await BookingController.getBookings(
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

    it("should handle errors when getting user booking", async () => {
      const mockError = new Error();
      (BookingService.getHistoryByUserId as jest.Mock).mockRejectedValue(mockError);

      await BookingController.getBookings(
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
