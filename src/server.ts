import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./database/data-source.js";

const app = express();
app.use(express.json());

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