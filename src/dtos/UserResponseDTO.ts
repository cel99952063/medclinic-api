export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: Date;
  updated_at?: Date;
}