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


    POST /auth/login

        Autentica o usuário e retorna um token JWT de acesso.


    GET /users/me (Protegido)

        Retorna os dados do perfil do usuário autenticado (requer Bearer Token).


Administração (RBAC):

    GET /admin/ping (Protegido por Token + Role Admin)

        Rota de verificação restrita exclusivamente ao perfil admin. Retorna mensagem de sucesso ou 403 Forbidden caso o usuário seja um atendente.


## 🛡 Tratamento de Erros
    
A API conta com um middleware global centralizado que intercepta exceções, formatando respostas padronizadas em JSON para erros de validação (400), conflitos (409) e falhas internas do servidor (500).

