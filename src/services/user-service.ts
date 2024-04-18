import bcrypt from "bcrypt";

import { UserRepository } from "../repositories/user-repository";
import { CreateUserRequest, CreateUserResponse } from "../models/user-model";

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
};

export { UserService };
