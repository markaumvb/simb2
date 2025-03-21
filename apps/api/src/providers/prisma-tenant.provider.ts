// src/providers/prisma-tenant.provider.ts
import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaService } from '@app/database/prisma.service';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class PrismaTenantService {
  constructor(
    @Inject(REQUEST) private _request: Request,
    private readonly prismaService: PrismaService,
  ) {}

  // Retorna o cliente Prisma original (sem modificações)
  get prisma() {
    return this.prismaService;
  }

  // Retorna o tenant atual
  get currentTenantId(): number | null {
    return this._request['tenantId'] ? Number(this._request['tenantId']) : null;
  }

  // Método para adicionar tenant_id a filtros
  addTenantToFilter(filter: any = {}): any {
    const tenantId = this.currentTenantId;
    if (tenantId === null) {
      return filter;
    }
    return { ...filter, tenant_id: tenantId };
  }

  // Método para adicionar tenant_id a dados
  addTenantToData(data: any = {}): any {
    const tenantId = this.currentTenantId;
    if (tenantId === null) {
      return data;
    }

    // Criar uma cópia para não modificar o original
    const newData = { ...data };

    // Adicionar tenant_id como campo numérico
    newData.tenant_id = tenantId;

    // Adicionar relação tenant para o Prisma
    newData.tenant = {
      connect: { id: tenantId },
    };

    return newData;
  }
}
