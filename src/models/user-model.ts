export interface UserModel {
  user_id: number;
  name: string;
  email: string;
  password: string;
  birthdate: Date;
  role: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  birthdate: Date;
  role: string;
}

export interface CreateUserResponse {
  user_id: number;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  token: string;
}
