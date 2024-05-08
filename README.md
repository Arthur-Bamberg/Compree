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
git clone https://github.com/seu-usuario/compree-api.git
```

2. Instale as dependências.

```bash
cd compree-api
npm install
```

3. Configure as variáveis de ambiente.
Crie um arquivo `.env` na raiz do projeto e preencha com as seguintes variáveis:

```dotenv
DATABASE_URL=postgresql://username:password@localhost:5432/compree
REDIS_URL=redis://localhost:6379
JWT_SECRET=sua-chave-secreta
```

4. Rode as migrações do banco de dados.

```bash
npm run typeorm migration:run
```

5. Inicie a aplicação.

```bash
npm run start
```

A aplicação estará rodando em `http://localhost:3000`.

## Coleção Postman

Utilize a seguinte coleção Postman para testar os endpoints:

```json
{
 "info": {
  "_postman_id": "0c181b0e-655c-4ea8-b8fa-98df2320ff8b",
  "name": "Compree",
  "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
  "_exporter_id": "26331696"
 },
 "item": [
  {
   "name": "Pedidos",
   "item": [
    {
     "name": "Fazer pedido",
     "request": {
      "auth": {
       "type": "bearer",
       "bearer": [
        {
         "key": "token",
         "value": "{{token_acesso}}",
         "type": "string"
        }
       ]
      },
      "method": "POST",
      "body": {
       "mode": "raw",
       "raw": "{\r\n    \"itensPedido\": [\r\n        {\r\n            \"produtoId\": \"07dc6650-a8f4-43bd-a702-e6d0902b5442\",\r\n            \"quantidade\": 1\r\n        }\r\n    ]\r\n}",
       "options": {
        "raw": {
         "language": "json"
        }
       }
      },
      "url": {
       "raw": "http://localhost:3000/pedidos",
       "protocol": "http",
       "host": ["localhost"],
       "port": "3000",
       "path": ["pedidos"]
      }
     },
     "response": []
    },
    {
     "name": "Atualizar pedido",
     "request": {
      "method": "PATCH",
      "body": {
       "mode": "raw",
       "raw": "{\r\n    \"status\": \"processado\"\r\n}",
       "options": {
        "raw": {
         "language": "json"
        }
       }
      },
      "url": {
       "raw": "http://localhost:3000/pedidos/6e0e4d63-59c4-4f35-8e13-04a99e8b2c54",
       "protocol": "http",
       "host": ["localhost"],
       "port": "3000",
       "path": ["pedidos", "6e0e4d63-59c4-4f35-8e13-04a99e8b2c54"]
      }
     },
     "response": []
    },
    {
     "name": "Obter pedidos de usuário",
     "request": {
      "auth": {
       "type": "bearer",
       "bearer": [
        {
         "key": "token",
         "value": "{{token_acesso}}",
         "type": "string"
        }
       ]
      },
      "method": "GET",
      "url": {
       "raw": "http://localhost:3000/pedidos",
       "protocol": "http",
       "host": ["localhost"],
       "port": "3000",
       "path": ["pedidos"]
      }
     },
     "response": []
    }
   ]
  },
  {
   "name": "Usuarios",
   "item": [
    {
     "name": "Obtém usuários",
     "request": {
      "method": "GET",
      "url": {
       "raw": "http://localhost:3000/usuarios",
       "protocol": "http",
       "host": ["localhost"],
       "port": "3000",
       "path": ["usuarios"]
      }
     },
     "response": []
    },
    {
     "name": "Cadastrar usuário",
     "request": {
      "method": "POST",
      "body": {
       "mode": "raw",
       "raw": "{\r\n    \"nome\": \"Antônio Evaldo\",\r\n    \"email\": \"evaldo@exemplo.com\",\r\n    \"senha\": \"*Senha123\"\r\n}",
       "options": {
        "raw": {
         "language": "json"
        }
       }
      },
      "url": {
       "raw": "http://localhost:3000/usuarios",
       "protocol": "http",
       "host": ["localhost"],
       "port": "3000",
       "path": ["usuarios"]
      }
     },
     "response": []
    },
    {
     "name": "Alterar usuário",
     "request": {
      "method": "PUT",
      "body": {
       "mode": "raw",
       "raw": "{\r\n    \"nome\": \"Antônio Evaldo\"\r\n}",
       "options": {
        "raw": {
         "language": "json"
        }
       }
      },
      "url": {
       "raw": "http://localhost:3000/usuarios/d4200a9f-517c-40cc-975a-c9097c3c78c2",
       "protocol": "http",
       "host": ["localhost"],
       "port": "3000",
       "path": ["usuarios", "d4200a9f-517c-40cc-975a-c9097c3c78c2"]
      }
     },
     "response": []
    },
    {
     "name": "Deletar usuário",
     "request": {
      "method": "DELETE",
      "url": {
       "raw": "http://localhost:3000/usuarios/2ff30359-3599-4324-af15-816932d37e79",
       "protocol": "http",
       "host": ["localhost"],
       "port": "3000",
       "path": ["usuarios", "2ff30359-3599-4324-af15-816932d37e79"]
      

 }
     },
     "response": []
    }
   ]
  },
  {
   "name": "Produtos",
   "item": [
    {
     "name": "Obter produtos",
     "request": {
      "method": "GET",
      "url": {
       "raw": "http://localhost:3000/produtos",
       "protocol": "http",
       "host": ["localhost"],
       "port": "3000",
       "path": ["produtos"]
      }
     },
     "response": []
    },
    {
     "name": "Obter produto por ID",
     "request": {
      "method": "GET",
      "url": {
       "raw": "http://localhost:3000/produtos/7f763376-969e-4c78-b2e9-1d1edfb6ac5d",
       "protocol": "http",
       "host": ["localhost"],
       "port": "3000",
       "path": ["produtos", "7f763376-969e-4c78-b2e9-1d1edfb6ac5d"]
      }
     },
     "response": []
    },
    {
     "name": "Cadastrar produto",
     "request": {
      "method": "POST",
      "body": {
       "mode": "raw",
       "raw": "{\r\n    \"nome\": \"Figure\",\r\n    \"valor\": 20,\r\n    \"quantidadeDisponivel\": 2,\r\n    \"descricao\": \"descrição...\",\r\n    \"caracteristicas\": [\r\n        {\r\n            \"nome\": \"material\",\r\n            \"descricao\": \"Plástico\"\r\n        }\r\n    ],\r\n    \"imagens\": [\r\n        {\r\n            \"url\": \"https://i.imgur.com/dwDZICq.jpg\",\r\n            \"descricao\": \"Imagem do Homem Aranha\"\r\n        }\r\n    ],\r\n    \"categoria\": \"Teste\"\r\n}",
       "options": {
        "raw": {
         "language": "json"
        }
       }
      },
      "url": {
       "raw": "http://localhost:3000/produtos",
       "protocol": "http",
       "host": ["localhost"],
       "port": "3000",
       "path": ["produtos"]
      }
     },
     "response": []
    },
    {
     "name": "Alterar produto",
     "request": {
      "method": "PUT",
      "body": {
       "mode": "raw",
       "raw": "{\r\n    \"quantidadeDisponivel\": 5\r\n}",
       "options": {
        "raw": {
         "language": "json"
        }
       }
      },
      "url": {
       "raw": "http://localhost:3000/produtos/076ba09f-bd0f-44ad-bb29-2497bb32a230",
       "protocol": "http",
       "host": ["localhost"],
       "port": "3000",
       "path": ["produtos", "076ba09f-bd0f-44ad-bb29-2497bb32a230"]
      }
     },
     "response": []
    },
    {
     "name": "Deletar produto",
     "request": {
      "method": "DELETE",
      "url": {
       "raw": "http://localhost:3000/produtos/56b6e6ac-2aec-4135-8c72-078ad69dc1eb",
       "protocol": "http",
       "host": ["localhost"],
       "port": "3000",
       "path": ["produtos", "56b6e6ac-2aec-4135-8c72-078ad69dc1eb"]
      }
     },
     "response": []
    }
   ]
  }
 ],
 "variable": [
  {
   "key": "token_acesso",
   "value": ""
  }
 ]
}
```

## Autor

Desenvolvido por Arthur Bamberg (<bamberguisses@gmail.com>).
