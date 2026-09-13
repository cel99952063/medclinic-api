# MedClinic API

API backend desenvolvida para o gerenciamento e controle de acesso de uma plataforma clínica, construída em Node.js com TypeScript, Express, TypeORM e PostgreSQL.

## 🛠 Tecnologias Utilizadas

* **Node.js** & **TypeScript**
* **Express** (Framework web)
* **TypeORM** (ORM para manipulação do banco de dados)
* **PostgreSQL** (Banco de dados relacional)
* **JWT (JSON Web Token)** (Autenticação)
* **Bcrypt** (Criptografia de senhas)

## 📋 Pré-requisitos

* Node.js (versão 18+)
* Gerenciador de pacotes npm
* Servidor PostgreSQL

## ⚙️ Configuração e Instalação

1. Clone o repositório:
   
    link público do repo:  (https://github.com/cel99952063/medclinic-api)

2. Instale as dependências:

    npm install

3. Configure o arquivo de variáveis de ambiente (.env) na raiz do projeto com base no modelo abaixo:
   
    PORT=3000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=sua_senha
    DB_NAME=medclinic
    JWT_SECRET=sua_chave_secreta_jwt

    (Caso desejar, em "\medclinic-api\SQL\DB_Script.sql" você encontra o script de criação do banco "medclinic".)

4. Faça as migrações para criar as tabelas no banco de dados:

    npm run typeorm migration:run


🚀 Executando a Aplicação:

    npm run dev


## 📚 Documentação dos Endpoints

Autenticação e Usuários:
    
    POST /auth/register

        Realiza o cadastro de um novo usuário (name, email, password, role):

        Roles aceitas: admin, atendente.


            *Exemplo de cadastro ADMIN válido:
                {
                 "name": "Administrador Teste",
                 "email": "admin@medclinic.com",
                 "password": "123456",
                 "role": "admin"   // se vazio, assume por padrão "atendente"
                }


            *Exemplo de resposta para cadastro ADMIN válido:

                {
                 "id": "611feb87-fbb6-4c5f-a6a0-6a9935e9d4ea",
                 "name": "Administrador Teste 2",
                 "email": "admin2@medclinic.com",
                 "role": "admin",
                 "created_at": "2026-09-13T23:22:37.984Z"
                }




    POST /auth/login

        Autentica o usuário e retorna um token JWT de acesso.


            *Exemplo de login válido:

                {
                 "email": "admin@medclinic.com",
                 "password": "123456"
                }


            *Exemplo de resposta para login válido:

                {
                 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWZlYjg3LWZiYjYtNGM1Zi1hNmEwLTZhOTk
                 zNWU5ZDRlYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4OTM0MjA3NCwiZXhwIjoxNzg5MzQ1Njc0fQ._1bG0T48toVt2QRP6XinE5-ZLemCm6FsTL06zR1JY9Q",
                 "user": {
                     "id": "611feb87-fbb6-4c5f-a6a0-6a9935e9d4ea",
                     "name": "Administrador Teste 2",
                     "email": "admin2@medclinic.com",
                     "role": "admin"
                }
                }            




    GET /users/me (Protegido)

        Retorna os dados do perfil do usuário autenticado (requer Bearer Token).


            *Exemplo de resposta a token válido:

                {
                    "id": "611feb87-fbb6-4c5f-a6a0-6a9935e9d4ea",
                    "name": "Administrador Teste 2",
                    "email": "admin2@medclinic.com",
                    "role": "admin",
                    "createdAt": "2026-09-13T23:22:37.984Z"
                }




Administração (RBAC):

    GET /admin/ping (Protegido por Token + Role Admin)

        Rota de verificação restrita exclusivamente ao perfil admin. Retorna mensagem de sucesso ou 403 Forbidden caso o usuário seja um atendente.

            
            *Exemplo de resposta a token + role válidos:

                {
                 "message": "Acesso autorizado ao painel administrativo!",
                 "user": {
                     "id": "611feb87-fbb6-4c5f-a6a0-6a9935e9d4ea",
                     "role": "admin",
                     "iat": 1789342074,
                     "exp": 1789345674
                }
                }



## 🛡 Tratamento de Erros
    
A API conta com um middleware global centralizado que intercepta exceções, formatando respostas padronizadas em JSON para erros de validação (400), conflitos (409) e falhas internas do servidor (500).




## Estrutura de pastas

medclinic-api/
├── SQL/
│   └── DB_Script.sql
├── src/
│   ├── controllers/
│   │   ├── AuthController.ts
│   │   └── UserController.ts
│   ├── database/
│   │   └── data-source.ts
│   ├── entities/
│   │   └── User.ts
│   ├── middlewares/
│   │   ├── authMiddleware.ts
│   │   ├── errorMiddleware.ts
│   │   └── roleMiddleware.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   └── userRoutes.ts
│   ├── services/
│   │   ├── AuthService.ts
│   │   └── UserService.ts
│   ├── utils/
│   │   └── jwt.ts
│   └── server.ts
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json