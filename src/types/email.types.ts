export interface Email {
  id: number;
  sender: number;
  recipient: string;
  subject: string;
  content: string;
  created_at: string;
}

// DTO for creating new email
export interface CreateEmailDto {
  sender: number;
  recipient: string;
  subject: string;
  content: string;
}

// API response interface for paginated emails
export interface EmailsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Email[];
}

// Form state interface
export interface EmailFormState {
  recipient: string;
  subject: string;
  content: string;
}
