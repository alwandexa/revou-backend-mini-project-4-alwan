import { Request, Response } from "express";

import { CreateUserRequest, LoginUserRequest } from "../models/user-model";
import { UserService } from "../services/user-service";

const UserController = {
  register: async (req: Request, res: Response) => {
    try {
      const createUserRequest = req.body as CreateUserRequest;
      const createUserReponse = await UserService.register(createUserRequest);

      res.status(200).json({
        data: createUserReponse,
      });
    } catch (e) {
      let errorMessage = "server error";

      if (e instanceof Error) {
        errorMessage = e.message;
      }

      res.status(500).json({
        error: errorMessage,
      });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const loginUserRequest = req.body as LoginUserRequest;
      const loginUserReponse = await UserService.login(loginUserRequest);

      res.status(200).json({
        data: loginUserReponse,
      });
    } catch (e) {
      let errorMessage = "server error";

      if (e instanceof Error) {
        errorMessage = e.message;
      }

      res.status(500).json({
        error: errorMessage,
      });
    }
  },
};

export { UserController };
