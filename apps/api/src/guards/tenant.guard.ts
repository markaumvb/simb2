// src/guards/tenant.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { TenantService } from '@app/modules/tenants/tenant.service';

@Injectable()
export class TenantGuard implements CanActivate {
  private readonly logger = new Logger(TenantGuard.name);

  constructor(private readonly tenantService: TenantService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tenantId = request.tenantId;

    // Verificar se o tenantId está presente
    if (!tenantId) {
      this.logger.warn('Acesso negado: tenantId não fornecido');
      throw new UnauthorizedException('Tenant não especificado');
    }

    // Verificar se o tenant existe
    const tenant = await this.tenantService.findOne(tenantId);
    if (!tenant) {
      this.logger.warn(`Acesso negado: tenant ${tenantId} não existe`);
      throw new UnauthorizedException(`Tenant ${tenantId} não existe`);
    }

    // Verificar se o usuário tem acesso a este tenant
    const user = request.user;
    if (!user) {
      this.logger.warn('Acesso negado: usuário não autenticado');
      throw new UnauthorizedException('Usuário não autenticado');
    }

    // Se o tenant do usuário não corresponder ao tenant solicitado
    if (user.tenantId !== tenantId) {
      this.logger.warn(
        `Acesso negado: usuário do tenant ${user.tenantId} tentando acessar tenant ${tenantId}`,
      );
      throw new UnauthorizedException('Acesso a outro tenant não permitido');
    }

    return true;
  }
}
