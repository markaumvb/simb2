/*
  Warnings:

  - Added the required column `descricao` to the `Linha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Linha" ADD COLUMN     "descricao" VARCHAR(50) NOT NULL;
