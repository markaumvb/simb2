import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaService } from 'src/database/prisma.service';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class PrismaTenantService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private prismaService: PrismaService,
  ) {}

  get prisma() {
    const tenantId = this.request['tenantId'];

    if (!tenantId) {
      // Se não encontrar tenantId, retorna o cliente prisma normal
      // Útil para rotas públicas ou admin
      return this.prismaService;
    }

    // Estende o cliente prisma com filtro de tenant
    return this.prismaService.$extends({
      query: {
        $allModels: {
          async $allOperations({ args, query, model }) {
            // Lista de modelos que não têm tenant_id
            const noTenantModels = ['Tenant'];

            if (!noTenantModels.includes(model)) {
              // Adiciona tenant_id em todas as consultas
              args.where = {
                ...args.where,
                tenant_id: parseInt(tenantId),
              };
            }

            return query(args);
          },
        },
      },
    });
  }
}
