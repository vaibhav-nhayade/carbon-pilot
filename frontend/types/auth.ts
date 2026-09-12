export type UserRole =
  | "industry_admin"
  | "facility_manager"
  | "sustainability_manager"
  | "analyst";

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  organization_name: string;
  created_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
  role: UserRole;
  organization_name: string;
  industry_type: string;
  organization_size: string;
  phone?: string;
  country: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}