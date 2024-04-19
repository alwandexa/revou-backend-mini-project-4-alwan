import { Request, Response } from "express";
import { CreateScheduleRequest } from "../models/schedule-model";
import { ScheduleService } from "../services/schedule-service";
import { ScheduleController } from "./schedule-controller";

describe("ScheduleController", () => {
  describe("createSchedule", () => {
    it("should create a new schedule successfully", async () => {
      const mockRequest = {
        body: {
          movie_id: 1,
          studio_id: 1,
          showtime: "",
          show_date: new Date(),
        } as CreateScheduleRequest,
      } as Request;

      const mockResponse = {
        status: () => mockResponse,
        json: () => mockResponse,
      } as unknown as Response;

      ScheduleService.createSchedule = jest.fn().mockResolvedValue({
        schedule_id: 1,
      });

      await ScheduleController.createSchedule(mockRequest, mockResponse);

      expect(ScheduleService.createSchedule).toHaveBeenCalledWith(
        mockRequest.body,
        expect.anything()
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(Number),
        })
      );
    });

    // it("should handle errors", async () => {
    //   const mockRequest = {
    //     body: {
    //       name: "Test Schedule",
    //       startTime: new Date(),
    //       endTime: new Date(),
    //     } as CreateScheduleRequest,
    //   };

    //   const mockResponse = {
    //     status: () => mockResponse,
    //     json: () => mockResponse,
    //   };

    //   const errorMessage = "Error creating schedule";

    //   ScheduleService.createSchedule = jest
    //     .fn()
    //     .mockRejectedValue(errorMessage);

    //   await ScheduleController.createSchedule(mockRequest, mockResponse);

    //   expect(mockResponse.status).toHaveBeenCalledWith(500);
    //   expect(mockResponse.json).toHaveBeenCalledWith({
    //     error: errorMessage,
    //   });
    // });
  });
});
