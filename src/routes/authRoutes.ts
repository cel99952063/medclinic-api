import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

const authRoutes = Router();
const userController = new UserController();

// Rota cadastro de usuários (RF03)
authRoutes.post("/auth/register", userController.create);

export { authRoutes };