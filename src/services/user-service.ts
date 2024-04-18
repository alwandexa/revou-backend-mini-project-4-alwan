import bcrypt from "bcrypt";

import { UserRepository } from "../repositories/user-repository";
import {
  CreateUserRequest,
  CreateUserResponse,
  LoginUserRequest,
  LoginUserResponse,
} from "../models/user-model";
import { generateJwtToken } from "../utils/util";

const UserService = {
  async register(
    createUserRequest: CreateUserRequest
  ): Promise<CreateUserResponse> {
    const hashedPassword = await bcrypt.hash(createUserRequest.password, 10);
    const createdUserId = await UserRepository.createUser({
      email: createUserRequest.email,
      password: hashedPassword,
      name: createUserRequest.name,
    });

    return {
      user_id: createdUserId,
    };
  },
  async login(loginUserRequest: LoginUserRequest): Promise<LoginUserResponse> {
    const user = await UserRepository.getByEmail(loginUserRequest.email);
    const isPasswordMatched = await bcrypt.compare(
      loginUserRequest.password,
      user.password
    );

    if (!isPasswordMatched) {
      throw new Error("invalid password");
    }

    const jwtToken = await generateJwtToken(user.user_id);

    return {
      token: jwtToken,
    };
  },
};

export { UserService };
