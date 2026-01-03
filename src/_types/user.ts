export interface User {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export type PublicUser = Omit<User, "email" | "phone">;

export interface RegisterInput {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
}

export interface AuthResponse {
  success: true;
  message: string;
  data: {
    user: User;
  };
}

export interface ProfileResponse {
  success: true;
  message: string;
  data: {
    user: User;
  };
}

export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface UpdateProfileResponse {
  success: true;
  message: string;
  data: {
    user: User;
  };
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: true;
  message: string;
}

export interface LogoutResponse {
  success: true;
  message: string;
}
