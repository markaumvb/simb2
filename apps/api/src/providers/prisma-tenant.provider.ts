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
  ) {
    this.logger.debug(
      `PrismaTenantService instanciado para uma nova requisição`,
    );
  }

  // Retorna o cliente Prisma original
  get prisma() {
    return this.prismaService;
  }

  // Obtém o ID do tenant a partir do contexto da requisição
  get currentTenantId(): number | null {
    const tenantId = this._request['tenantId']
      ? Number(this._request['tenantId'])
      : null;

    // Em desenvolvimento, é útil logar o tenant em uso
    if (process.env.NODE_ENV !== 'production') {
      this.logger.debug(`Operando no tenant: ${tenantId}`);
    }

    return tenantId;
  }

  // Adiciona tenant_id a filtros where para consultas
  addTenantToFilter(filter: any = {}): any {
    const tenantId = this.currentTenantId;

    // Em produção, não permitir operações sem tenant
    if (tenantId === null) {
      if (process.env.NODE_ENV === 'production') {
        throw new UnauthorizedException('Tenant ID é obrigatório');
      } else {
        this.logger.warn('Tenant ID nulo - em produção isso causará erro');
        return filter;
      }
    }

    // Combinar o filtro original com o tenant_id
    return { ...filter, tenant_id: tenantId };
  }

  // Adiciona tenant_id aos dados para criação/atualização
  addTenantToData(data: any = {}): any {
    const tenantId = this.currentTenantId;

    if (tenantId === null) {
      this.logger.warn(
        'Tentando adicionar tenant a dados, mas tenantId é nulo',
      );
      return data;
    }

    // Sobrescreve qualquer tenant_id que possa ter sido enviado, garantindo segurança
    return { ...data, tenant_id: tenantId };
  }

  // Método para envolver operações com transação garantindo o contexto do tenant
  async withTransaction<T>(callback: (tx: any) => Promise<T>): Promise<T> {
    const tenantId = this.currentTenantId;

    return this.prisma.client.$transaction(async (tx) => {
      // Se tivermos um tenant, poderíamos até definir variáveis de sessão no PostgreSQL
      if (tenantId !== null) {
        await tx.$executeRawUnsafe(`SET LOCAL app.tenant_id = ${tenantId}`);
      }

      return callback(tx);
    });
  }
}
