import jwt from "jsonwebtoken";

export interface TokenPayload {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

export function gerarToken(payload: Omit<TokenPayload, "iat" | "exp">): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET não configurado.");
  }

  return jwt.sign(payload, secret, { expiresIn: "1h" });
}

export function verificarToken(token: string): TokenPayload {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET não configurado.");
  }

  return jwt.verify(token, secret) as TokenPayload;
}