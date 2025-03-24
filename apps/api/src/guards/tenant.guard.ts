import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { TenantService } from '@app/modules/tenants/tenant.service';

@Injectable()
export class TenantGuard implements CanActivate {
  private readonly logger = new Logger(TenantGuard.name);

  constructor(private tenantService: TenantService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tenantId = request.tenantId;

    this.logger.log(`TenantGuard verificando tenantId: ${tenantId}`);

    if (!tenantId) {
      throw new UnauthorizedException('Tenant não especificado');
    }

    // Verificar se o tenant existe
    const tenant = await this.tenantService.findOne(tenantId);
    if (!tenant) {
      throw new UnauthorizedException(`Tenant ${tenantId} não existe`);
    }

    // Se estamos em ambiente de desenvolvimento, podemos pular verificações adicionais
    if (process.env.NODE_ENV === 'development') {
      this.logger.log(
        'Modo desenvolvimento: pulando verificação de acesso ao tenant',
      );
      return true;
    }

    // Verificar se o usuário tem acesso ao tenant
    const userId = request.user?.id;
    if (!userId) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    const hasAccess = await this.tenantService.verificarAcessoUsuario(
      userId,
      tenantId,
    );
    if (!hasAccess) {
      throw new UnauthorizedException('Usuário não tem acesso a este tenant');
    }

    return true;
  }
}
