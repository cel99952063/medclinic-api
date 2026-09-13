import type { Request, Response, NextFunction } from "express";

export function roleMiddleware(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: "Acesso negado: sem permissão." }); // RF11
    }

    return next();
  };
}