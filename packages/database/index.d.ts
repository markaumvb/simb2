import { PrismaClient } from "@prisma/client";
import { Decimal as DecimalJS } from "@prisma/client/runtime/library";
export * from "@prisma/client";
export { DecimalJS as Decimal };
export declare namespace Prisma {
    type Decimal = DecimalJS;
}
export declare const prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
