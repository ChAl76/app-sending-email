export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  email: string;
}

// src/types/email.types.ts
export interface Email {
  id: number;
  sender: number;
  recipient: string;
  subject: string;
  content: string;
  created_at: string;
}

export interface EmailsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Email[];
}

export interface CreateEmailDto {
  sender: number;
  recipient: string;
  subject: string;
  message: string;
}
