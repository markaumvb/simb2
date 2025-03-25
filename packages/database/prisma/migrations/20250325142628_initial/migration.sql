/*
  Warnings:

  - You are about to drop the column `status` on the `Deposito` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Deposito" DROP COLUMN "status",
ADD COLUMN     "especie" "Especie" NOT NULL DEFAULT 'DINHEIRO';
