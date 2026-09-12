import bcrypt from "bcrypt";
import { AppDataSource } from "../database/data-source.js";
import { User } from "../entities/User.js";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export class UserService {
  async execute({ name, email, password, role }: IUserRequest) {
    const userRepository = AppDataSource.getRepository(User);

    // Valida campos obrigatórios (RF05 RF11)
    if (!name || !email || !password) {
      throw new Error("Todos os campos obrigatórios devem ser preenchidos.");
    }

    // Validaformato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Formato de e-mail inválido.");
    }

    // Verifica e-mail já cadastrado (RF05 / RF11)
    const userExists = await userRepository.findOne({ where: { email } });
    if (userExists) {
      throw new Error("E-mail já cadastrado no sistema.");
    }

    // Criptografia da senha (RF06 / RNF05)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: role || "Atendente",
    });

    await userRepository.save(user);

    // Oculta a senha antes de retorn (RF05)
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}