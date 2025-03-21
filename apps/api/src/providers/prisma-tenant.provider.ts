// src/providers/prisma-tenant.provider.ts
import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaService } from '@database';

@Injectable({ scope: Scope.REQUEST })
export class PrismaTenantService {
  constructor(
    @Inject(REQUEST) private _request: Request,
    private readonly prismaService: PrismaService,
  ) {}

  // Retorna o cliente Prisma original
  get prisma() {
    return this.prismaService;
  }

  // Retorna o tenant atual
  get currentTenantId(): number | null {
    return this._request['tenantId'] ? Number(this._request['tenantId']) : null;
  }

  // Adiciona tenant_id a filtros where
  addTenantToFilter(filter: any = {}): any {
    const tenantId = this.currentTenantId;
    if (tenantId === null) {
      return filter;
    }
    return { ...filter, tenant_id: tenantId };
  }

  // Adiciona tenant_id e relação tenant a dados
  addTenantToData(data: any = {}): any {
    const tenantId = this.currentTenantId;
    if (tenantId === null) {
      return data;
    }

    // Criar uma cópia dos dados
    const newData = { ...data };

    // Adicionar tenant_id
    newData.tenant_id = tenantId;

    // Adicionar relação tenant
    newData.tenant = {
      connect: { id: tenantId },
    };

    return newData;
  }
}
