/*
  Warnings:

  - The `status` column on the `Acerto_fechamento` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Almoxarifado` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `especie` on the `Deposito` table. All the data in the column will be lost.
  - You are about to drop the column `especie` on the `Despesa` table. All the data in the column will be lost.
  - The `status` column on the `Mesa` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tipo` column on the `Ponto` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusMesa" AS ENUM ('DISPONIVEL', 'OCUPADA', 'MANUTENCAO', 'NO_DEPOSITO');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CONCLUIDO', 'PENDENTE');

-- CreateEnum
CREATE TYPE "Especie" AS ENUM ('PIX', 'DINHEIRO', 'CARTAO_DEBITO', 'CARTAO_CREDITO', 'CHEQUE', 'BOLETO', 'TRANSFERENCIA', 'DEPOSITO', 'OUTROS');

-- CreateEnum
CREATE TYPE "StatusAlmoxarifado" AS ENUM ('DISPONIVEL', 'PENDENTE', 'ESGOTADO');

-- CreateEnum
CREATE TYPE "TipoPonto" AS ENUM ('COMERCIAL', 'RESIDENCIAL');

-- AlterTable
ALTER TABLE "Acerto_fechamento" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDENTE';

-- AlterTable
ALTER TABLE "Almoxarifado" DROP COLUMN "status",
ADD COLUMN     "status" "StatusAlmoxarifado" NOT NULL DEFAULT 'DISPONIVEL';

-- AlterTable
ALTER TABLE "Deposito" DROP COLUMN "especie",
ADD COLUMN     "status" "Especie" NOT NULL DEFAULT 'DINHEIRO';

-- AlterTable
ALTER TABLE "Despesa" DROP COLUMN "especie",
ADD COLUMN     "status" "Especie" NOT NULL DEFAULT 'DINHEIRO';

-- AlterTable
ALTER TABLE "Mesa" DROP COLUMN "status",
ADD COLUMN     "status" "StatusMesa" NOT NULL DEFAULT 'DISPONIVEL';

-- AlterTable
ALTER TABLE "Ponto" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoPonto" NOT NULL DEFAULT 'COMERCIAL';

-- CreateIndex
CREATE INDEX "Cliente_nome_idx" ON "Cliente"("nome");
