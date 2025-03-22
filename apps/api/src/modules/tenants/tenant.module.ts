import { Global, Module } from '@nestjs/common';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { PrismaModule } from '@app/database/prisma.module';
import { PrismaTenantModule } from '@app/providers/prisma-tenant.module';

@Global() // Torna o módulo global
@Module({
  imports: [
    PrismaModule,
    PrismaTenantModule, // Importa o módulo do PrismaTenantService
  ],
  controllers: [TenantController],
  providers: [TenantService],
  exports: [TenantService], // Exporta o TenantService para estar disponível em outros módulos
})
export class TenantModule {}
