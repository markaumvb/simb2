// src/providers/prisma-tenant.provider.ts
import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaService } from 'src/database/prisma.service';
import { Request } from 'express';
import { PrismaClient } from '@prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class PrismaTenantService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private prismaService: PrismaService,
  ) {}

  get prisma(): PrismaClient {
    const tenantId = this.request['tenantId'];

    if (!tenantId) {
      // Se não encontrar tenantId, retorna o cliente prisma normal
      return this.prismaService;
    }

    // Estende o cliente prisma com filtro de tenant
    return this.prismaService.$extends({
      query: {
        $allModels: {
          async $allOperations({ args, query, model, operation }) {
            // Lista de modelos que não têm tenant_id
            const noTenantModels = ['Tenant'];

            // Lista de operações que não têm 'where'
            const noWhereOperations = ['create', 'createMany'];

            if (
              !noTenantModels.includes(model) &&
              !noWhereOperations.includes(operation)
            ) {
              // Operações que têm 'where' podem ter tenant_id adicionado
              if (args && 'where' in args) {
                args.where = {
                  ...args.where,
                  tenant_id: parseInt(tenantId),
                };
              }
            } else if (
              operation === 'create' &&
              !noTenantModels.includes(model)
            ) {
              // Para operação create, adicionar tenant_id nos dados
              if (args && 'data' in args) {
                args.data = {
                  ...args.data,
                  tenant_id: parseInt(tenantId),
                };
              }
            } else if (
              operation === 'createMany' &&
              !noTenantModels.includes(model)
            ) {
              // Para operação createMany, adicionar tenant_id em cada item de dados
              if (args && 'data' in args && Array.isArray(args.data)) {
                args.data = args.data.map((item) => ({
                  ...item,
                  tenant_id: parseInt(tenantId),
                }));
              }
            }

            return query(args);
          },
        },
      },
    });
  }
}
