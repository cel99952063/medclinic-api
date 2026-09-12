import type { Request, Response } from "express";
import { UserService } from "../services/UserService.js";

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password, role } = req.body;

      const userService = new UserService();
      const user = await userService.execute({ name, email, password, role });

      return res.status(201).json(user);
    } catch (error: any) {
      // Tratamento de mensagens de erro que vem do service (status 400 ou 409)
      if (
        error.message.includes("preenchidos") ||
        error.message.includes("inválido")
      ) {
        return res.status(400).json({ error: error.message });
      }
      if (error.message.includes("já cadastrado")) {
        return res.status(409).json({ error: error.message });
      }

      console.error("Erro interno no servidor:", error);
      return res.status(500).json({ error: "Erro interno no servidor." });
    }
  }
}