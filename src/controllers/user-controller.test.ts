import { UserController } from "./user-controller";
import { CreateUserRequest, LoginUserRequest } from "../models/user-model";
import { Request } from "express";

describe("UserController", () => {
  describe("register", () => {
    it("should register a new user", async () => {
      const mockReq = {
        body: {
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
        } as CreateUserRequest,
      } as Request;

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(UserController, "register").mockResolvedValueOnce({
        id: 1,
        name: "John Doe",
        email: "john@example.com",
      });

      await UserController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        data: {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
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

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Error registering user";

      jest
        .spyOn(UserController, "register")
        .mockRejectedValueOnce(new Error(errorMessage));

      await UserController.register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: errorMessage,
      });
    });
  });

  describe("login", () => {
    it("should login an existing user", async () => {
      const mockReq = {
        body: {
          email: "john@example.com",
          password: "password123",
        } as LoginUserRequest,
      };

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(UserController, "login").mockResolvedValueOnce({
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        token: "123abc",
      });

      await UserController.login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        data: {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          token: "123abc",
        },
      });
    });

    it("should handle login errors", async () => {
      const mockReq = {
        body: {
          email: "john@example.com",
          password: "wrongpassword",
        } as LoginUserRequest,
      };

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Invalid email or password";

      jest
        .spyOn(UserController, "login")
        .mockRejectedValueOnce(new Error(errorMessage));

      await UserController.login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: errorMessage,
      });
    });
  });
});
