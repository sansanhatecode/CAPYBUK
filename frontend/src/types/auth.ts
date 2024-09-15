export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponseData {
  id: number;
  userName: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}