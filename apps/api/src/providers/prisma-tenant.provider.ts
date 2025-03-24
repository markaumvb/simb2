// src/providers/prisma-tenant.provider.ts
import { Injectable, Scope, Inject, Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaService } from '@app/database/prisma.service';

@Injectable({ scope: Scope.REQUEST })
export class PrismaTenantService {
  private readonly logger = new Logger(PrismaTenantService.name);

  constructor(
    @Inject(REQUEST) private _request: Request,
    private readonly prismaService: PrismaService,
  ) {}

  // Retorna o cliente Prisma original
  get prisma() {
    return this.prismaService;
  }

  get currentTenantId(): number | null {
    const tenantId = this._request['tenantId']
      ? Number(this._request['tenantId'])
      : null;

    this.logger.log(`Current tenantId: ${tenantId}`);

    // Para desenvolvimento, nunca retornar null
    if (tenantId === null && process.env.NODE_ENV === 'development') {
      this.logger.warn(
        'TenantId nulo em ambiente de desenvolvimento, usando padrão: 1',
      );
      return 1;
    }

    return tenantId;
  }

  // Adiciona tenant_id a filtros where
  addTenantToFilter(filter: any = {}): any {
    const tenantId = this.currentTenantId;
    if (tenantId === null) {
      this.logger.warn(
        'Tentando adicionar tenant a filtro, mas tenantId é nulo',
      );
      if (process.env.NODE_ENV === 'development') {
        this.logger.warn('Usando tenant padrão para desenvolvimento');
        return { ...filter, tenant_id: 1 };
      }
      return filter;
    }

    this.logger.log(`Adicionando tenant_id ${tenantId} ao filtro`);
    return { ...filter, tenant_id: tenantId };
  }

  addTenantToData(data: any = {}): any {
    const tenantId = this.currentTenantId;
    if (tenantId === null) {
      this.logger.warn(
        'Tentando adicionar tenant a dados, mas tenantId é nulo',
      );
      if (process.env.NODE_ENV === 'development') {
        this.logger.warn('Usando tenant padrão para desenvolvimento');
        return { ...data, tenant_id: 1 };
      }
      return data;
    }

    this.logger.log(`Adicionando tenant_id ${tenantId} aos dados`);
    return { ...data, tenant_id: tenantId };
  }
}
