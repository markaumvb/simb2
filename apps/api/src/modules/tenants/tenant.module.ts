import { Module } from '@nestjs/common';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { PrismaModule } from '@app/database/prisma.module';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider'; // Adicione este import

@Module({
  imports: [PrismaModule],
  controllers: [TenantController],
  providers: [TenantService, PrismaTenantService], // Adicione PrismaTenantService aqui
  exports: [TenantService],
})
export class TenantModule {}
