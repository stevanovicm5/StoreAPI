export interface UserInfo{
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface AuthResponse {
  accessToken: string;
  user: UserInfo;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}