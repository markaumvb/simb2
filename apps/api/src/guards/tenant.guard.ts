// src/guards/tenant.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { TenantService } from '@app/modules/tenants/tenant.service';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private tenantService: TenantService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tenantId = request.tenantId;

    if (!tenantId) {
      throw new UnauthorizedException('Tenant não especificado');
    }

    // Para desenvolvimento - verificar flag de ambiente
    const isDev = process.env.NODE_ENV === 'development';

    if (!isDev) {
      // Em produção, verificamos se o usuário tem acesso ao tenant
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
    } else {
      console.log('Development mode: skipping tenant access check');
    }

    return true;
  }
}
