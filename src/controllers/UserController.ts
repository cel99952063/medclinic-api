import type { Request, Response } from "express";
import { AppDataSource } from "../database/data-source.js";
import { User } from "../entities/User.js";

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password, role } = req.body;

      const userRepository = AppDataSource.getRepository(User);

      // Verifico e-mail cadastrado RF03 RF04)
      const userExists = await userRepository.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: "E-mail já cadastrado." });
      }

      const user = userRepository.create({
        name,
        email,
        password, 
        role: role || "Atendente",
      });

      await userRepository.save(user);

      // Retorno usuário criado sem a senha
      const { password: _, ...userWithoutPassword } = user;
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ error: "Erro interno no servidor." });
    }
  }
}