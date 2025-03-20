-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('email', 'API');

-- CreateTable
CREATE TABLE "tenants" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "razao_social" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "dt_alteracao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dt_inclusao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Acerto_fechamento" (
    "id" SERIAL NOT NULL,
    "data" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_linha" INTEGER NOT NULL,
    "id_movimentacao" INTEGER NOT NULL,
    "id_funcionario" INTEGER NOT NULL,
    "dt_alteracao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dt_inclusao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Acerto_fechamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Almoxarifado" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(60) NOT NULL,
    "dt_alteracao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dt_inclusao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "valor_unitario" DECIMAL(8,2) NOT NULL DEFAULT 0,
    "saldo" DECIMAL(8,2) NOT NULL DEFAULT 0,
    "saldo_min" DECIMAL(8,2) DEFAULT 0,
    "saldo_max" DECIMAL(8,2) DEFAULT 0,
    "status" VARCHAR(20) NOT NULL,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Almoxarifado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brinde" (
    "id" SERIAL NOT NULL,
    "taco" BOOLEAN NOT NULL DEFAULT false,
    "trofeu" BOOLEAN NOT NULL DEFAULT false,
    "outros" BOOLEAN NOT NULL DEFAULT false,
    "dt_alteracao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dt_inclusao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "id_linha" INTEGER NOT NULL,
    "id_movimentacao" INTEGER NOT NULL,
    "id_mesa" INTEGER NOT NULL,
    "troca_pano" BOOLEAN NOT NULL DEFAULT false,
    "data" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Brinde_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cidade" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(30) NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "dt_alteracao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dt_inclusao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Cidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "id_cidade" INTEGER NOT NULL,
    "documento" VARCHAR(22),
    "endereco" VARCHAR(50),
    "bairro" VARCHAR(20),
    "fone" VARCHAR(20),
    "nome" VARCHAR(50) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "id_linha" INTEGER NOT NULL,
    "cep" VARCHAR(9),
    "dt_nascimento" DATE,
    "dt_alteracao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dt_inclusao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "complemento" VARCHAR(30),
    "numero" VARCHAR(5),
    "tipo_pessoa" VARCHAR(10) DEFAULT 'Física',
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cobranca" (
    "id" SERIAL NOT NULL,
    "data_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_linha" INTEGER NOT NULL,
    "id_mesa" INTEGER NOT NULL,
    "id_movimentacao" INTEGER NOT NULL,
    "valor_cobrado" DECIMAL(5,2) NOT NULL,
    "desconto" DECIMAL(5,2),
    "dt_alteracao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "dt_inclusao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "contador_anterior" INTEGER NOT NULL,
    "contador_atual" INTEGER NOT NULL,
    "motivo_visita" VARCHAR(150),
    "coord_y" VARCHAR(20),
    "coord_x" VARCHAR(20),
    "id_ponto" INTEGER,
    "tipo_cobranca" VARCHAR(15),
    "id_funcionario" INTEGER NOT NULL,
    "contador_brinde_atual" INTEGER,
    "contador_brinde_anterior" INTEGER,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Cobranca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Composicao" (
    "id" SERIAL NOT NULL,
    "id_mesa" INTEGER NOT NULL,
    "dt_inclusao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "dt_alteracao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "saldo" DECIMAL(8,2) DEFAULT 0,
    "id_almoxarifado" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Composicao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Debitos_cliente" (
    "id" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "id_linha" INTEGER NOT NULL,
    "dt_alteracao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "dt_inclusao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "debito_credito" VARCHAR(10) NOT NULL DEFAULT 'Débito',
    "valor" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Debitos_cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deposito" (
    "id" SERIAL NOT NULL,
    "dt_hora" TIMESTAMP(6) NOT NULL,
    "valor" DECIMAL(6,2) NOT NULL,
    "especie" VARCHAR(15) NOT NULL DEFAULT 'Dinheiro',
    "dt_cheque" DATE,
    "id_linha" INTEGER NOT NULL,
    "id_movimentacao" INTEGER NOT NULL,
    "dt_alteracao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dt_inclusao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "id_cliente" INTEGER,
    "numero_boleto" VARCHAR(30),
    "id_funcionario" INTEGER NOT NULL,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Deposito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Despesa" (
    "id" SERIAL NOT NULL,
    "favorecido" VARCHAR(50) NOT NULL,
    "valor" DECIMAL(6,2) NOT NULL,
    "dt_hora" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "especie" VARCHAR(15) NOT NULL DEFAULT 'Dinheiro',
    "dt_cheque" DATE,
    "num_cheque" VARCHAR(15),
    "id_linha" INTEGER NOT NULL,
    "id_movimentacao" INTEGER NOT NULL,
    "dt_alteracao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "dt_inclusao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "id_funcionario" INTEGER,
    "id_ponto" INTEGER,
    "id_tipo" INTEGER NOT NULL,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Despesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Devolucao_mesa" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(700) NOT NULL,
    "dt_alteracao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "dt_inlusao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "id_mesa" INTEGER NOT NULL,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Devolucao_mesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funcao" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,
    "dt_alteracao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dt_inclusao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "id_sistema" INTEGER NOT NULL,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Funcao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "dt_nascimento" DATE,
    "endereco" VARCHAR(60),
    "id_cidade" INTEGER NOT NULL,
    "bairro" VARCHAR(60),
    "telefone" VARCHAR(14),
    "cpf" VARCHAR(12) NOT NULL,
    "cep" VARCHAR(10),
    "status" BOOLEAN NOT NULL DEFAULT false,
    "dt_admissao" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_inclusao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "dt_alteracao" TIMESTAMP(3),
    "celular" VARCHAR(14),
    "numero_endereco" INTEGER,
    "complemento" VARCHAR(20),
    "salario_base" DECIMAL(8,2),
    "comissao" DECIMAL(5,2),
    "vale_alimentacao" DECIMAL(5,2),
    "nota_promissoria" DECIMAL(7,2) DEFAULT 0,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "dt_aposentadoria" DATE,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funcionario_perfil" (
    "id" SERIAL NOT NULL,
    "id_funcionario" INTEGER NOT NULL,
    "id_perfil" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "dt_alteracao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dt_inclusao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "id_sistema" INTEGER,
    "coord_x" VARCHAR(20),
    "coord_y" VARCHAR(20),
    "descricao" VARCHAR(200),
    "id_linha" INTEGER,
    "num_telefone" VARCHAR(20),
    "token" VARCHAR(200),
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Funcionario_perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Historico_composicao" (
    "id" SERIAL NOT NULL,
    "id_composicao" INTEGER NOT NULL,
    "saldo" INTEGER NOT NULL,
    "dt_inclusao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Historico_composicao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Historico_ponto" (
    "id" SERIAL NOT NULL,
    "id_ponto" INTEGER NOT NULL,
    "id_linha" INTEGER NOT NULL,
    "id_movimentacao" INTEGER NOT NULL,
    "numero_ponto" INTEGER,
    "dt_inclusao_ponto" TIMESTAMP(6),
    "dt_alteracao_ponto" TIMESTAMP(6),
    "cliente" VARCHAR(60) NOT NULL,
    "dt_inicio_cliente" TIMESTAMP(6),
    "dt_encerramento_cliente" TIMESTAMP(6),
    "fantasia" VARCHAR(30),
    "dt_inclusao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "qtde_mesa" INTEGER NOT NULL,
    "media_cobranca" DECIMAL(15,2),
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Historico_ponto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Itens_acerto" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(60) NOT NULL,
    "valor" DECIMAL(12,2) NOT NULL,
    "data" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_acerto_fechamento" INTEGER NOT NULL,
    "debito_credito" CHAR(8) NOT NULL DEFAULT 'crédito',
    "dt_inclusao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_alteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_item_acerto" INTEGER,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Itens_acerto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Itens_pedido_almoxarifado" (
    "id" SERIAL NOT NULL,
    "id_almoxarifado" INTEGER NOT NULL,
    "qtde" DECIMAL(7,2) NOT NULL,
    "status" CHAR(15) NOT NULL,
    "dt_alteracao" DATE DEFAULT CURRENT_TIMESTAMP,
    "dt_inclusao" DATE DEFAULT CURRENT_TIMESTAMP,
    "valor" DECIMAL(7,2) NOT NULL,
    "id_pedido" INTEGER NOT NULL,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Itens_pedido_almoxarifado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Linha" (
    "id" SERIAL NOT NULL,
    "status" VARCHAR(7) NOT NULL DEFAULT 'Ativo',
    "dt_alteracao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dt_inclusao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Linha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log_mesa" (
    "id" SERIAL NOT NULL,
    "id_mesa" INTEGER NOT NULL,
    "contador_anterior" INTEGER NOT NULL,
    "contador_atual" INTEGER NOT NULL,
    "valor_anterior" DECIMAL(5,2),
    "valor_atual" DECIMAL(5,2),
    "porcentagem_anterior" DECIMAL(2,2),
    "porcentagem_atual" DECIMAL(2,2),
    "data" TIMESTAMP(6) NOT NULL,
    "id_linha" INTEGER NOT NULL,
    "id_movimentacao" INTEGER NOT NULL,
    "cord_x" VARCHAR(30),
    "cord_y" VARCHAR(30),
    "id_funcionario" INTEGER,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Log_mesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Membros_linha" (
    "id" SERIAL NOT NULL,
    "dt_alteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_inclusao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_funcionario" INTEGER NOT NULL,
    "id_funcao" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Membros_linha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mesa" (
    "id" INTEGER NOT NULL,
    "status" CHAR(30) NOT NULL DEFAULT 'Disponível',
    "cont_atual" INTEGER NOT NULL DEFAULT 0,
    "cont_anterior" INTEGER NOT NULL DEFAULT 0,
    "tipo_cobranca" CHAR(12),
    "porcentagem_cliente" DECIMAL(3,2) DEFAULT 0,
    "dt_locacao" DATE,
    "id_linha" INTEGER,
    "valor" DECIMAL(5,2) DEFAULT 0,
    "id_tipo" INTEGER NOT NULL,
    "meses_cobranca" INTEGER NOT NULL DEFAULT 0,
    "dt_alteracao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "dt_inclusao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "cord_x" VARCHAR(30),
    "cord_y" VARCHAR(30),
    "dt_entrada_linha" TIMESTAMP(6),
    "dt_saida_linha" TIMESTAMP(6),
    "id_ponto" INTEGER,
    "chave" VARCHAR(10),
    "cont_brinde_anterior" INTEGER,
    "cont_brinde_atual" INTEGER,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Mesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mesa_entrada" (
    "id" SERIAL NOT NULL,
    "id_mesa" INTEGER NOT NULL,
    "id_linha" INTEGER NOT NULL,
    "id_movimentacao" INTEGER NOT NULL,
    "data_hora" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_inclusao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "dt_alteracao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "coord_x" VARCHAR(30),
    "coord_y" VARCHAR(30),
    "id_ponto" INTEGER NOT NULL,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Mesa_entrada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mesa_saida" (
    "id" SERIAL NOT NULL,
    "id_mesa" INTEGER NOT NULL,
    "id_linha" INTEGER NOT NULL,
    "id_movimentacao" INTEGER NOT NULL,
    "data_hora" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_alteracao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dt_inclusao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "coord_x" VARCHAR(30),
    "coord_y" VARCHAR(30),
    "id_ponto" INTEGER NOT NULL,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Mesa_saida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movimentacao" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(30) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "dt_inicio" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_encerramento" DATE,
    "id_linha" INTEGER NOT NULL,
    "dt_alteracao" DATE DEFAULT CURRENT_TIMESTAMP,
    "dt_possivel_encerramento" DATE DEFAULT CURRENT_TIMESTAMP,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Movimentacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido_almoxarifado" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_inclusao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "dt_alteracao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(30) NOT NULL,
    "id_linha" INTEGER NOT NULL,
    "id_movimentacao" INTEGER NOT NULL,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Pedido_almoxarifado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perfil" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(20) NOT NULL,
    "cidade" BOOLEAN NOT NULL DEFAULT false,
    "cliente" BOOLEAN NOT NULL DEFAULT false,
    "debitos_cliente" BOOLEAN NOT NULL DEFAULT false,
    "movimentacao" BOOLEAN NOT NULL DEFAULT false,
    "deposito" BOOLEAN NOT NULL DEFAULT false,
    "despesa" BOOLEAN NOT NULL DEFAULT false,
    "funcionario" BOOLEAN NOT NULL DEFAULT false,
    "linha" BOOLEAN NOT NULL DEFAULT false,
    "mesa" BOOLEAN NOT NULL DEFAULT false,
    "cobranca" BOOLEAN NOT NULL DEFAULT false,
    "perfil" BOOLEAN NOT NULL DEFAULT false,
    "dt_alteracao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_inclusao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "per_gestor" BOOLEAN NOT NULL DEFAULT false,
    "ponto" BOOLEAN NOT NULL DEFAULT false,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissoes_usuario" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(200) NOT NULL,
    "num_telefone" VARCHAR(20),
    "id_funcionario" INTEGER NOT NULL,
    "permitido" BOOLEAN NOT NULL DEFAULT false,
    "dt_solicitacao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_alteracao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "id_linha" INTEGER NOT NULL,
    "coord_x" VARCHAR(20),
    "coord_y" VARCHAR(20),
    "token" VARCHAR(200),
    "id_sistema" INTEGER NOT NULL,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Permissoes_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ponto" (
    "id" SERIAL NOT NULL,
    "id_cidade" INTEGER NOT NULL,
    "endereco" VARCHAR(50) NOT NULL,
    "numero_endereco" INTEGER,
    "cep" VARCHAR(9),
    "coord_y" VARCHAR(20),
    "coord_x" VARCHAR(20),
    "dt_inclusao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_alteracao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "id_linha" INTEGER NOT NULL,
    "tipo" VARCHAR(20) NOT NULL,
    "complemento" VARCHAR(30),
    "bairro" VARCHAR(20),
    "numero_ponto" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "paga_aluguel" BOOLEAN NOT NULL DEFAULT false,
    "valor_aluguel" DECIMAL(7,2),
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Ponto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ponto_cliente" (
    "id" SERIAL NOT NULL,
    "fantasia" VARCHAR(30) NOT NULL,
    "id_linha" INTEGER NOT NULL,
    "id_ponto" INTEGER NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "documento" VARCHAR(22),
    "ativo" BOOLEAN NOT NULL DEFAULT false,
    "dt_inclusao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "dt_alteracao" TIMESTAMP(3),
    "dt_encerramento" TIMESTAMP(6),
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Ponto_cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sistema" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(60) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "dt_inclusao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_alteracao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Sistema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tipo_despesa" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,
    "dt_inclusao" DATE,
    "dt_alteracao" DATE,
    "status" BOOLEAN DEFAULT true,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Tipo_despesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tipo_mesa" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(20) NOT NULL,
    "dt_inclusao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "dt_alteracao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "composicao" BOOLEAN NOT NULL DEFAULT false,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Tipo_mesa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_cnpj_key" ON "tenants"("cnpj");

-- CreateIndex
CREATE INDEX "fki_fk_acerto_funcionario" ON "Acerto_fechamento"("id_funcionario");

-- CreateIndex
CREATE INDEX "fki_fk_acerto_linha" ON "Acerto_fechamento"("id_linha");

-- CreateIndex
CREATE INDEX "fki_fk_acerto_movimentacao" ON "Acerto_fechamento"("id_movimentacao");

-- CreateIndex
CREATE INDEX "fki_fk_brinde_linha" ON "Brinde"("id_linha");

-- CreateIndex
CREATE INDEX "fki_fk_brinde_mesa" ON "Brinde"("id_mesa");

-- CreateIndex
CREATE INDEX "fki_fk_brinde_movimentacao" ON "Brinde"("id_movimentacao");

-- CreateIndex
CREATE UNIQUE INDEX "Cidade_descricao_uf_tenant_id_key" ON "Cidade"("descricao", "uf", "tenant_id");

-- CreateIndex
CREATE INDEX "fki_fk_cliente_cidade" ON "Cliente"("id_cidade");

-- CreateIndex
CREATE INDEX "fki_fk_cliente_linha" ON "Cliente"("id_linha");

-- CreateIndex
CREATE INDEX "fki_fk_movimentacao_funcionario" ON "Cobranca"("id_funcionario");

-- CreateIndex
CREATE INDEX "fki_fk_movimentacao_linha" ON "Cobranca"("id_linha");

-- CreateIndex
CREATE INDEX "fki_fk_movimentacao_mesa" ON "Cobranca"("id_mesa");

-- CreateIndex
CREATE INDEX "fki_fk_movimentacao_movimentacao" ON "Cobranca"("id_movimentacao");

-- CreateIndex
CREATE INDEX "fki_fk_movimentacao_ponto" ON "Cobranca"("id_ponto");

-- CreateIndex
CREATE INDEX "fki_fk_composicao_almoxarifado" ON "Composicao"("id_almoxarifado");

-- CreateIndex
CREATE INDEX "fki_fk_composicao_mesa" ON "Composicao"("id_mesa");

-- CreateIndex
CREATE INDEX "fki_fk_debito_cliente_cliente" ON "Debitos_cliente"("id_cliente");

-- CreateIndex
CREATE INDEX "fki_fk_debito_cliente_linha" ON "Debitos_cliente"("id_linha");

-- CreateIndex
CREATE INDEX "fki_fk_deposito_cliente" ON "Deposito"("id_cliente");

-- CreateIndex
CREATE INDEX "fki_fk_deposito_linha" ON "Deposito"("id_linha");

-- CreateIndex
CREATE INDEX "fki_fk_deposito_movimentacao" ON "Deposito"("id_movimentacao");

-- CreateIndex
CREATE INDEX "fki_fK_despesa_linha" ON "Despesa"("id_linha");

-- CreateIndex
CREATE INDEX "fki_fk_despesa_funcionario" ON "Despesa"("id_funcionario");

-- CreateIndex
CREATE INDEX "fki_fk_despesa_movimentacao" ON "Despesa"("id_movimentacao");

-- CreateIndex
CREATE INDEX "fki_fk_despesa_ponto" ON "Despesa"("id_ponto");

-- CreateIndex
CREATE INDEX "fki_fk_devolucao_mesa" ON "Devolucao_mesa"("id_mesa");

-- CreateIndex
CREATE INDEX "fki_fk_funcao_sistema" ON "Funcao"("id_sistema");

-- CreateIndex
CREATE INDEX "fki_fk_funcionario_cidade" ON "Funcionario"("id_cidade");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_email_tenant_id_key" ON "Funcionario"("email", "tenant_id");

-- CreateIndex
CREATE INDEX "fki_fk_funcionario_perfil_funcionario" ON "Funcionario_perfil"("id_funcionario");

-- CreateIndex
CREATE INDEX "fki_fk_funcionario_perfil_linha" ON "Funcionario_perfil"("id_linha");

-- CreateIndex
CREATE INDEX "fki_fk_funcionario_perfil_perfil" ON "Funcionario_perfil"("id_perfil");

-- CreateIndex
CREATE INDEX "fki_fk_funcionario_perfil_sistema" ON "Funcionario_perfil"("id_sistema");

-- CreateIndex
CREATE INDEX "fki_fk_historico_composicao_composicao" ON "Historico_composicao"("id_composicao");

-- CreateIndex
CREATE INDEX "fki_fk_historico_ponto_linha" ON "Historico_ponto"("id_linha");

-- CreateIndex
CREATE INDEX "fki_fk_historico_ponto_movimentacao" ON "Historico_ponto"("id_movimentacao");

-- CreateIndex
CREATE INDEX "fki_fk_historico_ponto_ponto" ON "Historico_ponto"("id_ponto");

-- CreateIndex
CREATE INDEX "fki_fk_itens_acerto_acerto" ON "Itens_acerto"("id_acerto_fechamento");

-- CreateIndex
CREATE INDEX "fki_fk_itens_pedido_almoxarifado_almoxarifado" ON "Itens_pedido_almoxarifado"("id_almoxarifado");

-- CreateIndex
CREATE INDEX "fki_fk_itens_pedido_almoxarifado_pedido" ON "Itens_pedido_almoxarifado"("id");

-- CreateIndex
CREATE INDEX "fki_fk_log_mesa_funcionario" ON "Log_mesa"("id_funcionario");

-- CreateIndex
CREATE INDEX "fki_fk_log_mesa_linha" ON "Log_mesa"("id_linha");

-- CreateIndex
CREATE INDEX "fki_fk_log_mesa_mesa" ON "Log_mesa"("id_mesa");

-- CreateIndex
CREATE INDEX "fki_fk_membros_linha_funcao" ON "Membros_linha"("id_funcao");

-- CreateIndex
CREATE INDEX "fki_fk_membros_linha_funcionario" ON "Membros_linha"("id_funcionario");

-- CreateIndex
CREATE INDEX "fki_fk_mesa_linha" ON "Mesa"("id_linha");

-- CreateIndex
CREATE INDEX "fki_fk_mesa_ponto" ON "Mesa"("id_ponto");

-- CreateIndex
CREATE INDEX "fki_fk_mesa_tipo" ON "Mesa"("id_tipo");

-- CreateIndex
CREATE INDEX "fki_fk_mesa_entrada_linha" ON "Mesa_entrada"("id_linha");

-- CreateIndex
CREATE INDEX "fki_fk_mesa_entrada_mesa" ON "Mesa_entrada"("id_mesa");

-- CreateIndex
CREATE INDEX "fki_fk_mesa_entrada_movimentacao" ON "Mesa_entrada"("id_movimentacao");

-- CreateIndex
CREATE INDEX "fki_fk_mesa_entrada_ponto" ON "Mesa_entrada"("id_ponto");

-- CreateIndex
CREATE INDEX "fki_fk_mesa_saida_linha" ON "Mesa_saida"("id_linha");

-- CreateIndex
CREATE INDEX "fki_fk_mesa_saida_mesa" ON "Mesa_saida"("id_mesa");

-- CreateIndex
CREATE INDEX "fki_fk_mesa_saida_movimentacao" ON "Mesa_saida"("id_movimentacao");

-- CreateIndex
CREATE INDEX "fki_fk_mesa_saida_ponto" ON "Mesa_saida"("id_ponto");

-- CreateIndex
CREATE INDEX "fki_fk_pedido_almoxarifado_linha" ON "Pedido_almoxarifado"("id_linha");

-- CreateIndex
CREATE INDEX "fki_fk_pedido_almoxarifado_movimentacao" ON "Pedido_almoxarifado"("id_movimentacao");

-- CreateIndex
CREATE INDEX "fki_fk_permissao_dispositivo_funcionario" ON "Permissoes_usuario"("id_funcionario");

-- CreateIndex
CREATE INDEX "fki_fk_permissao_dispositivo_linha" ON "Permissoes_usuario"("id_linha");

-- CreateIndex
CREATE INDEX "fki_fk_permissao_dispositivo_sistema" ON "Permissoes_usuario"("id_sistema");

-- CreateIndex
CREATE UNIQUE INDEX "Ponto_numero_ponto_key" ON "Ponto"("numero_ponto");

-- CreateIndex
CREATE INDEX "fki_fk_ponto_cidade" ON "Ponto"("id_cidade");

-- CreateIndex
CREATE INDEX "fki_fk_ponto_linha" ON "Ponto"("id_linha");

-- CreateIndex
CREATE INDEX "fki_fk_ponto_cliente_cliente" ON "Ponto_cliente"("id_cliente");

-- CreateIndex
CREATE INDEX "fki_fk_ponto_cliente_linha" ON "Ponto_cliente"("id_linha");

-- CreateIndex
CREATE INDEX "fki_fk_ponto_cliente_ponto" ON "Ponto_cliente"("id_ponto");

-- AddForeignKey
ALTER TABLE "Acerto_fechamento" ADD CONSTRAINT "Acerto_fechamento_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Acerto_fechamento" ADD CONSTRAINT "fk_acerto_funcionario" FOREIGN KEY ("id_funcionario") REFERENCES "Funcionario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Acerto_fechamento" ADD CONSTRAINT "fk_acerto_linha" FOREIGN KEY ("id_linha") REFERENCES "Linha"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Acerto_fechamento" ADD CONSTRAINT "fk_acerto_movimentacao" FOREIGN KEY ("id_movimentacao") REFERENCES "Movimentacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Almoxarifado" ADD CONSTRAINT "Almoxarifado_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brinde" ADD CONSTRAINT "Brinde_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brinde" ADD CONSTRAINT "fk_brinde_linha" FOREIGN KEY ("id_linha") REFERENCES "Linha"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Brinde" ADD CONSTRAINT "fk_brinde_mesa" FOREIGN KEY ("id_mesa") REFERENCES "Mesa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Brinde" ADD CONSTRAINT "fk_brinde_movimentacao" FOREIGN KEY ("id_movimentacao") REFERENCES "Movimentacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Cidade" ADD CONSTRAINT "Cidade_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "fk_cliente_cidade" FOREIGN KEY ("id_cidade") REFERENCES "Cidade"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "fk_cliente_linha" FOREIGN KEY ("id_linha") REFERENCES "Linha"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Cobranca" ADD CONSTRAINT "Cobranca_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cobranca" ADD CONSTRAINT "fk_movimentacao_funcionario" FOREIGN KEY ("id_funcionario") REFERENCES "Funcionario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Cobranca" ADD CONSTRAINT "fk_movimentacao_linha" FOREIGN KEY ("id_linha") REFERENCES "Linha"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Cobranca" ADD CONSTRAINT "fk_movimentacao_mesa" FOREIGN KEY ("id_mesa") REFERENCES "Mesa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Cobranca" ADD CONSTRAINT "fk_movimentacao_movimentacao" FOREIGN KEY ("id_movimentacao") REFERENCES "Movimentacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Cobranca" ADD CONSTRAINT "fk_movimentacao_ponto" FOREIGN KEY ("id_ponto") REFERENCES "Ponto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Composicao" ADD CONSTRAINT "Composicao_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Composicao" ADD CONSTRAINT "fk_composicao_almoxarifado" FOREIGN KEY ("id_almoxarifado") REFERENCES "Almoxarifado"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Composicao" ADD CONSTRAINT "fk_composicao_mesa" FOREIGN KEY ("id_mesa") REFERENCES "Mesa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Debitos_cliente" ADD CONSTRAINT "Debitos_cliente_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debitos_cliente" ADD CONSTRAINT "fk_debito_cliente_cliente" FOREIGN KEY ("id_cliente") REFERENCES "Cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Debitos_cliente" ADD CONSTRAINT "fk_debito_cliente_linha" FOREIGN KEY ("id_linha") REFERENCES "Linha"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Deposito" ADD CONSTRAINT "Deposito_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deposito" ADD CONSTRAINT "fk_deposito_cliente" FOREIGN KEY ("id_cliente") REFERENCES "Cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Deposito" ADD CONSTRAINT "fk_deposito_linha" FOREIGN KEY ("id_linha") REFERENCES "Linha"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Deposito" ADD CONSTRAINT "fk_deposito_movimentacao" FOREIGN KEY ("id_movimentacao") REFERENCES "Movimentacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "Despesa_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "fK_despesa_linha" FOREIGN KEY ("id_linha") REFERENCES "Linha"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "fk_despesa_funcionario" FOREIGN KEY ("id_funcionario") REFERENCES "Funcionario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "fk_despesa_movimentacao" FOREIGN KEY ("id_movimentacao") REFERENCES "Movimentacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "fk_despesa_ponto" FOREIGN KEY ("id_ponto") REFERENCES "Ponto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "fk_tipo_despesa" FOREIGN KEY ("id_tipo") REFERENCES "Tipo_despesa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Devolucao_mesa" ADD CONSTRAINT "Devolucao_mesa_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devolucao_mesa" ADD CONSTRAINT "fk_devolucao_mesa" FOREIGN KEY ("id_mesa") REFERENCES "Mesa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Funcao" ADD CONSTRAINT "Funcao_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcao" ADD CONSTRAINT "fk_funcao_sistema" FOREIGN KEY ("id_sistema") REFERENCES "Sistema"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "fk_funcionario_cidade" FOREIGN KEY ("id_cidade") REFERENCES "Cidade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Funcionario_perfil" ADD CONSTRAINT "Funcionario_perfil_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionario_perfil" ADD CONSTRAINT "fk_funcionario_perfil_funcionario" FOREIGN KEY ("id_funcionario") REFERENCES "Funcionario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Funcionario_perfil" ADD CONSTRAINT "fk_funcionario_perfil_linha" FOREIGN KEY ("id_linha") REFERENCES "Linha"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Funcionario_perfil" ADD CONSTRAINT "fk_funcionario_perfil_perfil" FOREIGN KEY ("id_perfil") REFERENCES "Perfil"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Funcionario_perfil" ADD CONSTRAINT "fk_funcionario_perfil_sistema" FOREIGN KEY ("id_sistema") REFERENCES "Sistema"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Historico_composicao" ADD CONSTRAINT "Historico_composicao_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historico_composicao" ADD CONSTRAINT "fk_historico_composicao_composicao" FOREIGN KEY ("id_composicao") REFERENCES "Composicao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Historico_ponto" ADD CONSTRAINT "Historico_ponto_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historico_ponto" ADD CONSTRAINT "fk_historico_ponto_linha" FOREIGN KEY ("id_linha") REFERENCES "Linha"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Historico_ponto" ADD CONSTRAINT "fk_historico_ponto_movimentacao" FOREIGN KEY ("id_movimentacao") REFERENCES "Movimentacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Historico_ponto" ADD CONSTRAINT "fk_historico_ponto_ponto" FOREIGN KEY ("id_ponto") REFERENCES "Ponto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Itens_acerto" ADD CONSTRAINT "Itens_acerto_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itens_acerto" ADD CONSTRAINT "fk_itens_acerto_acerto" FOREIGN KEY ("id_acerto_fechamento") REFERENCES "Acerto_fechamento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Itens_acerto" ADD CONSTRAINT "Itens_acerto_id_item_acerto_fkey" FOREIGN KEY ("id_item_acerto") REFERENCES "Itens_acerto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Itens_pedido_almoxarifado" ADD CONSTRAINT "Itens_pedido_almoxarifado_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itens_pedido_almoxarifado" ADD CONSTRAINT "fk_itens_pedido_almoxarifado_almoxarifado" FOREIGN KEY ("id_almoxarifado") REFERENCES "Almoxarifado"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Itens_pedido_almoxarifado" ADD CONSTRAINT "fk_itens_pedido_almoxarifado_pedido" FOREIGN KEY ("id_pedido") REFERENCES "Pedido_almoxarifado"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Linha" ADD CONSTRAINT "Linha_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log_mesa" ADD CONSTRAINT "Log_mesa_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log_mesa" ADD CONSTRAINT "fk_log_mesa_funcionario" FOREIGN KEY ("id_funcionario") REFERENCES "Funcionario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Log_mesa" ADD CONSTRAINT "fk_log_mesa_linha" FOREIGN KEY ("id_linha") REFERENCES "Linha"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Log_mesa" ADD CONSTRAINT "fk_log_mesa_mesa" FOREIGN KEY ("id_mesa") REFERENCES "Mesa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Membros_linha" ADD CONSTRAINT "Membros_linha_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membros_linha" ADD CONSTRAINT "fk_membros_linha_funcao" FOREIGN KEY ("id_funcao") REFERENCES "Funcao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Membros_linha" ADD CONSTRAINT "fk_membros_linha_funcionario" FOREIGN KEY ("id_funcionario") REFERENCES "Funcionario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Mesa" ADD CONSTRAINT "Mesa_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mesa" ADD CONSTRAINT "fk_mesa_linha" FOREIGN KEY ("id_linha") REFERENCES "Linha"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Mesa" ADD CONSTRAINT "fk_mesa_ponto" FOREIGN KEY ("id_ponto") REFERENCES "Ponto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Mesa" ADD CONSTRAINT "fk_mesa_tipo" FOREIGN KEY ("id_tipo") REFERENCES "Tipo_mesa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Mesa_entrada" ADD CONSTRAINT "Mesa_entrada_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mesa_entrada" ADD CONSTRAINT "fk_mesa_entrada_linha" FOREIGN KEY ("id_linha") REFERENCES "Linha"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Mesa_entrada" ADD CONSTRAINT "fk_mesa_entrada_mesa" FOREIGN KEY ("id_mesa") REFERENCES "Mesa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Mesa_entrada" ADD CONSTRAINT "fk_mesa_entrada_movimentacao" FOREIGN KEY ("id_movimentacao") REFERENCES "Movimentacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Mesa_entrada" ADD CONSTRAINT "fk_mesa_entrada_ponto" FOREIGN KEY ("id_ponto") REFERENCES "Ponto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Mesa_saida" ADD CONSTRAINT "Mesa_saida_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mesa_saida" ADD CONSTRAINT "fk_mesa_saida_linha" FOREIGN KEY ("id_linha") REFERENCES "Linha"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Mesa_saida" ADD CONSTRAINT "fk_mesa_saida_mesa" FOREIGN KEY ("id_mesa") REFERENCES "Mesa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Mesa_saida" ADD CONSTRAINT "fk_mesa_saida_movimentacao" FOREIGN KEY ("id_movimentacao") REFERENCES "Movimentacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Mesa_saida" ADD CONSTRAINT "fk_mesa_saida_ponto" FOREIGN KEY ("id_ponto") REFERENCES "Ponto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Movimentacao" ADD CONSTRAINT "Movimentacao_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimentacao" ADD CONSTRAINT "Movimentacao_id_linha_fkey" FOREIGN KEY ("id_linha") REFERENCES "Linha"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Pedido_almoxarifado" ADD CONSTRAINT "Pedido_almoxarifado_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido_almoxarifado" ADD CONSTRAINT "fk_pedido_almoxarifado_linha" FOREIGN KEY ("id_linha") REFERENCES "Linha"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Pedido_almoxarifado" ADD CONSTRAINT "fk_pedido_almoxarifado_movimentacao" FOREIGN KEY ("id_movimentacao") REFERENCES "Movimentacao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Perfil" ADD CONSTRAINT "Perfil_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissoes_usuario" ADD CONSTRAINT "Permissoes_usuario_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissoes_usuario" ADD CONSTRAINT "fk_permissao_dispositivo_funcionario" FOREIGN KEY ("id_funcionario") REFERENCES "Funcionario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Permissoes_usuario" ADD CONSTRAINT "fk_permissao_dispositivo_linha" FOREIGN KEY ("id_linha") REFERENCES "Linha"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Permissoes_usuario" ADD CONSTRAINT "fk_permissao_dispositivo_sistema" FOREIGN KEY ("id_sistema") REFERENCES "Sistema"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Ponto" ADD CONSTRAINT "Ponto_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ponto" ADD CONSTRAINT "fk_ponto_cidade" FOREIGN KEY ("id_cidade") REFERENCES "Cidade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Ponto" ADD CONSTRAINT "fk_ponto_linha" FOREIGN KEY ("id_linha") REFERENCES "Linha"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Ponto_cliente" ADD CONSTRAINT "Ponto_cliente_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ponto_cliente" ADD CONSTRAINT "fk_ponto_cliente_cliente" FOREIGN KEY ("id_cliente") REFERENCES "Cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Ponto_cliente" ADD CONSTRAINT "fk_ponto_cliente_linha" FOREIGN KEY ("id_linha") REFERENCES "Linha"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Ponto_cliente" ADD CONSTRAINT "fk_ponto_cliente_ponto" FOREIGN KEY ("id_ponto") REFERENCES "Ponto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Sistema" ADD CONSTRAINT "Sistema_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tipo_despesa" ADD CONSTRAINT "Tipo_despesa_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tipo_mesa" ADD CONSTRAINT "Tipo_mesa_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
