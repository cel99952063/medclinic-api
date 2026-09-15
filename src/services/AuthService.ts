import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../database/data-source.js";
import { User } from "../entities/User.js";
import { gerarToken } from "../utils/jwt.js";
import type { LoginDTO } from "../dtos/LoginDTO.js";
import type { AuthResponseDTO } from "../dtos/AuthResponseDTO.js";

/*interface ILoginRequest {
  email: string;
  password: string;
}*/

export class AuthService {
  async execute({ email, password }: LoginDTO): Promise<AuthResponseDTO> {
    const userRepository = AppDataSource.getRepository(User);

    if (!email || !password) {
      throw new Error("E-mail e senha são obrigatórios.");
    }

    const user = await userRepository.findOne({ where: { email } });
    
    // Validação genérica para evitar enumeração de e-mails (RF07 / RF11)
    if (!user) {
      throw new Error("Credenciais inválidas.");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Credenciais inválidas.");
    }

    const token = gerarToken({ id: user.id, role: user.role });
    
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
      },
    };
  }
}