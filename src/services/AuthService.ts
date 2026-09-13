import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../database/data-source.js";
import { User } from "../entities/User.js";

interface ILoginRequest {
  email: string;
  password: string;
}

export class AuthService {
  async execute({ email, password }: ILoginRequest) {
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

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET não configurado no ambiente.");
    }

    // Emite o token JWT contendo id e perfil do usuário (RF07)
    const token = jwt.sign(
      { id: user.id, role: user.role },
      secret,
      { expiresIn: "1h" }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}