import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

// Declare o namespace Prisma
declare global {
  namespace PrismaNamespace {
    type PrismaClientType = PrismaClient;
    type DecimalType = Decimal;
  }
}
