import { PrismaClient } from "@prisma/client";
import { Decimal as DecimalJS } from "@prisma/client/runtime/library";

// Re-exportar todos os tipos do Prisma
export * from "@prisma/client";

// Exportar Decimal para compatibilidade
export { DecimalJS as Decimal };

// Adicionar o tipo Decimal ao namespace Prisma
export namespace Prisma {
  export type Decimal = DecimalJS;
}

// Exportar o cliente Prisma
export const prisma = new PrismaClient();
