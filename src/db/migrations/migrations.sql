CREATE TABLE "usuarios" (
  "id" uuid DEFAULT uuid_generate_v4(),
  "nome" varchar(100) NOT NULL,
  "email" varchar(70) NOT NULL,
  "senha" varchar(255) NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" TIMESTAMP,
  CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id")
);

CREATE TABLE "produtos" (
  "id" uuid DEFAULT uuid_generate_v4(),
  "usuario_id" uuid NOT NULL,
  "nome" varchar(100) NOT NULL,
  "valor" integer NOT NULL,
  "quantidade_disponivel" integer NOT NULL,
  "descricao" varchar(255) NOT NULL,
  "categoria" varchar(100) NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" TIMESTAMP,
  CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"),
  FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE "produto_imagens" (
  "id" uuid DEFAULT uuid_generate_v4(),
  "url" varchar(100) NOT NULL,
  "descricao" varchar(100) NOT NULL,
  "produtoId" uuid,
  CONSTRAINT "PK_d1cf326e8d58dbc469bd7fe2f32" PRIMARY KEY ("id"),
  FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "produto_caracteristicas" (
  "id" uuid DEFAULT uuid_generate_v4(),
  "nome" varchar(100) NOT NULL,
  "descricao" varchar(255) NOT NULL,
  "produtoId" uuid,
  CONSTRAINT "PK_132816ff55e30a6bf554c9e2545" PRIMARY KEY ("id"),
  FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "pedidos" (
  "id" uuid DEFAULT uuid_generate_v4(),
  "valor_total" integer NOT NULL,
  "status" varchar NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" TIMESTAMP,
  "usuarioId" uuid,
  CONSTRAINT "PK_ebb5680ed29a24efdc586846725" PRIMARY KEY ("id"),
  FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE "itens_pedidos" (
  "id" uuid DEFAULT uuid_generate_v4(),
  "quantidade" integer NOT NULL,
  "preco_venda" integer NOT NULL,
  "pedidoId" uuid,
  "produtoId" uuid,
  CONSTRAINT "PK_d93e780d333fe5d91e43797e8b5" PRIMARY KEY ("id"),
  FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
