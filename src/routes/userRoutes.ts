import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

const userRoutes = Router();
const userController = new UserController();

// Rota cadastro de usuários (RF03)
userRoutes.post("/users", userController.create);

export { userRoutes };