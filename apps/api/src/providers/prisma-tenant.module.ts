// src/providers/prisma-tenant.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaTenantService } from './prisma-tenant.provider';
import { PrismaModule } from '@app/database/prisma.module';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [PrismaTenantService],
  exports: [PrismaTenantService],
})
export class PrismaTenantModule {}
