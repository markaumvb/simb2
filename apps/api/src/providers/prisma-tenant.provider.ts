import {
  Injectable,
  Scope,
  Inject,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
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

    return tenantId;
  }

  // Adiciona tenant_id a filtros where
  addTenantToFilter(filter: any = {}): any {
    const tenantId = this.currentTenantId;
    if (tenantId === null) {
      if (process.env.NODE_ENV === 'production') {
        throw new UnauthorizedException('Tenant ID é obrigatório');
      } else {
        this.logger.warn('Tenant ID nulo - em produção isso causará erro');
        return filter;
      }
    }

    this.logger.log(`Adicionando tenant_id ${tenantId} ao filtro`);
    return { ...filter, tenant_id: tenantId };
  }

  // Adiciona tenant_id aos dados
  addTenantToData(data: any = {}): any {
    const tenantId = this.currentTenantId;
    if (tenantId === null) {
      this.logger.warn(
        'Tentando adicionar tenant a dados, mas tenantId é nulo',
      );
      return data;
    }

    this.logger.log(`Adicionando tenant_id ${tenantId} aos dados`);
    return { ...data, tenant_id: tenantId };
  }
}
