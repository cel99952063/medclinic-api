import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./database/data-source.js";
import { authRoutes } from "./routes/authRoutes.js"; 
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();
app.use(express.json());
app.use(authRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

//  RF02 e RNF01
AppDataSource.initialize()
  .then(() => {
    console.log("DB conectado com sucesso!");

    app.listen(PORT, () => {
      console.log(`Server rodando na port ${PORT}`);
    });
  })
  .catch((error) => console.log("Erro ao iniciar Data Source:", error));