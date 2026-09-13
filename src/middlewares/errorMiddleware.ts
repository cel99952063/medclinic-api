import type { Request, Response, NextFunction } from "express";

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);

  // Erros conhecidos de validação ou regra de negócio
  if (error.message.includes("obrigatório") || error.message.includes("inválido")) {
    return res.status(400).json({ error: error.message });
  }

  // Erro de conflito de cadastro (ex: e-mail já cadastrado)
  if (error.message.includes("já cadastrado")) {
    return res.status(409).json({ error: error.message });
  }

  // Erro padrão para falhas internas do servidor
  return res.status(500).json({
    error: "Erro interno do servidor.",
    message: error.message,
  });
}