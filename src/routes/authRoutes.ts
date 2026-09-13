import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { AuthController } from "../controllers/AuthController.js";

const authRoutes = Router();
const userController = new UserController();
const authController = new AuthController();

// Rota cadastro de usuários (RF03 rf07)
authRoutes.post("/auth/register", userController.create);
authRoutes.post("/auth/login", authController.login);

export { authRoutes };