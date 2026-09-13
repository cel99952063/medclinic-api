import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";



const userRoutes = Router();
const userController = new UserController();

// Rota cadastro de usuários (RF03/05)
userRoutes.post("/users", (req, res) => userController.create(req, res));

// Rota para obter os dados do usuário autenticado (com token válido)  RF10)
userRoutes.get("/users/me", authMiddleware, (req, res) => userController.getMe(req, res));

// Rota protegida de teste restrita ao perfil "admin" (RF10
userRoutes.get("/admin/ping", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
  return res.status(200).json({
    message: "Acesso autorizado ao painel administrativo!",
    user: req.user,
  });
});


export { userRoutes };