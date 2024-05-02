import { Request, Response } from "express";
import dayjs from "dayjs";

import { StudioController } from "./studio-controller";
import { StudioService } from "../services/studio-service";
import { CreateStudioRequest } from "../models/studio-model";

const now: Date = new Date();
const formattedNow = dayjs(now).format("YYYY-MM-DD HH:mm:ss");

jest.mock("../services/studio-service");
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

  describe("Create Schedule", () => {
    it("should create a schedule successfully", async () => {
      mockRequest = {
        body: {
          name: "cinema",
          capacity: 120,
        } as CreateStudioRequest,
      };

      (StudioService.createStudio as jest.Mock).mockResolvedValue({});

      await StudioController.createStudio(
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

    it("should handle errors when create schedule", async () => {
      const mockError = new Error();
      (StudioService.createStudio as jest.Mock).mockRejectedValue(mockError);

      await StudioController.createStudio(
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

  describe("Update Schedule", () => {
    it("should update a schedule successfully", async () => {
      (StudioService.updateStudio as jest.Mock).mockResolvedValue({});

      await StudioController.updateStudio(
        {} as Request,
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

    it("should handle errors when update schedule", async () => {
      const mockError = new Error();
      (StudioService.updateStudio as jest.Mock).mockRejectedValue(mockError);

      await StudioController.updateStudio(
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

  describe("Delete Schedule", () => {
    it("should delete a schedule successfully", async () => {
      (StudioService.deleteStudio as jest.Mock).mockResolvedValue({});

      await StudioController.deleteStudio(
        {} as Request,
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

    it("should handle errors when delete schedule", async () => {
      const mockError = new Error();
      (StudioService.deleteStudio as jest.Mock).mockRejectedValue(mockError);

      await StudioController.deleteStudio(
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
