import { UserController } from "./user-controller";
import { CreateUserRequest, LoginUserRequest } from "../models/user-model";
import { Request, Response } from "express";
import { UserService } from "../services/user-service";

jest.mock("../services/user-service");

describe("UserController", () => {
  describe("register", () => {
    it("should register a new user", async () => {
      const mockRequest: Partial<Request> = {
        body: {
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
          birthdate: new Date("1990-01-01"),
        } as CreateUserRequest,
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        contentType: jest.fn(),
      };

      const mockRegisterResponse = {
        user_id: 1,
      };
      (UserService.register as jest.Mock).mockResolvedValue(
        mockRegisterResponse
      );

      await UserController.register(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: {
          user_id: 1,
        },
      });
    });

    it("should handle errors", async () => {
      const mockReq = {
        body: {
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
        } as CreateUserRequest,
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        contentType: jest.fn(),
      };

      const errorMessage = "Error registering user";

      //   jest
      //     .spyOn(UserService, "register")
      //     .mockRejectedValueOnce(new Error(errorMessage));
      (UserService.register as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage)
      );

      await UserController.register(
        mockReq as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: errorMessage,
      });
    });
  });

  describe("login", () => {
    it("should login an existing user", async () => {
      const mockRequest: Partial<Request> = {
        body: {
          email: "john@example.com",
          password: "password123",
        } as LoginUserRequest,
      };

      const mockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockLoginResponse = {
        token: "asdfoij091091283980",
      };

      (UserService.login as jest.Mock).mockResolvedValue(mockLoginResponse);

      await UserController.login(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: {
          token: "asdfoij091091283980",
        },
      });
    });
  });
});
