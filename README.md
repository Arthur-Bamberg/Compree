# Compree API

## Descrição

A **Compree API** é uma API RESTful desenvolvida utilizando **NestJS**, **PostgreSQL** e **Redis** para uma loja chamada Compree. Essa API oferece funcionalidades para gerenciamento de produtos, pedidos, usuários e autenticação.

Este projeto foi desenvolvido durante os seguintes cursos:

- **Nest.js: Criando uma API Restful**
- **Nest.js: Persistindo Dados com TypeORM e PostgreSQL**
- **Nest.js: Lidando com Migrações, Relacionamentos ORM e Erros em uma API**
- **Nest.js: Adicionando Funcionalidades com Redis, JWT e Logging**

## Funcionalidades

A API fornece os seguintes endpoints principais:

### Autenticação

- **POST /autenticacao/login** - Realiza login de um usuário e retorna o token de acesso.

### Pedidos

- **POST /pedidos** - Cria um novo pedido.
- **PATCH /pedidos/:id** - Atualiza o status de um pedido.
- **GET /pedidos** - Obtém todos os pedidos do usuário autenticado.

### Usuários

- **GET /usuarios** - Lista todos os usuários.
- **POST /usuarios** - Cria um novo usuário.
- **PUT /usuarios/:id** - Atualiza os dados de um usuário.
- **DELETE /usuarios/:id** - Remove um usuário.

### Produtos

- **GET /produtos** - Lista todos os produtos.
- **GET /produtos/:id** - Obtém um produto específico por ID.
- **POST /produtos** - Cadastra um novo produto.
- **PUT /produtos/:id** - Atualiza os dados de um produto.
- **DELETE /produtos/:id** - Remove um produto.

## Tecnologias Utilizadas

- **NestJS** - Framework Node.js para construção de APIs escaláveis.
- **PostgreSQL** - Banco de dados relacional.
- **TypeORM** - Ferramenta de ORM para manipulação de dados.
- **Redis** - Armazenamento temporário de dados e cache.
- **JWT** - Autenticação com tokens.
- **Postman** - Ferramenta de teste de APIs.

## Como Rodar a Aplicação

1. Clone este repositório.

```bash
git clone https://github.com/Arthur-Bamberg/Compree.git
```

2. Instale as dependências.

```bash
cd Compree
npm install
```

3. Configure as variáveis de ambiente.
Crie um arquivo `.env` na raiz do projeto e preencha com as seguintes variáveis:

```dotenv
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=root
DB_NAME=db_loja
SAL_SENHA=$2b$10$4XsseV1M5TwLYGk5x3aB0e
SEGREDO_JWT=yUKe1KMUwhsRKdb1f2Ljmt3tzPAuAAqeFHAY554PKlNA5BfQjYc0qblLZ3W3zdW3
```

4. Mude para a versão do NodeJS em que essa versão do TypeORM funciona.

```bash
nvm install 17
nvm use 17
```

5. Rode as migrações do banco de dados.

```bash
npm run migrations
```

6. Inicie a aplicação.

```bash
npm run start
```

A aplicação estará rodando em `http://localhost:3000`.

## Coleção Postman

Utilize a coleção Postman para testar os endpoints. Importe o arquivo `Compree.postman_collection.json` em seu Postman.

## Autor

Desenvolvido por Arthur Bamberg (<bamberguisses@gmail.com>).
