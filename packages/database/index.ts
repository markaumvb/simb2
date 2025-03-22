import { PrismaClient } from "@prisma/client";
import { Decimal as DecimalJS } from "@prisma/client/runtime/library";
export * from "@prisma/client";
export { DecimalJS as Decimal };

export namespace Prisma {
  export type Decimal = DecimalJS;
}

export const prisma = new PrismaClient();
