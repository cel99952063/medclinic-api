import type { UserResponseDTO } from "./UserResponseDTO.js";

export interface AuthResponseDTO {
  token: string;
  user?: UserResponseDTO;
}