export interface LoginRequest {
  username: string;
  password: string;
}
export interface RegisterRequest extends LoginRequest {
  displayName: string;
}

export interface LoginResponseData {
  // username: string;
  // email: string;
  accessToken: string;
  refreshToken: string;
}