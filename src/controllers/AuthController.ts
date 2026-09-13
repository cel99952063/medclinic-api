import type { Request, Response } from "express";
import { AuthService } from "../services/AuthService.js";

export class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const authService = new AuthService();
      const result = await authService.execute({ email, password });

      return res.status(200).json(result);
    } catch (error: any) {
      if (error.message.includes("Credenciais") || error.message.includes("obrigatórios")) {
        return res.status(401).json({ error: error.message });
      }

      console.error("Erro interno no login:", error);
      return res.status(500).json({ error: "Erro interno no servidor." });
    }
  }
}