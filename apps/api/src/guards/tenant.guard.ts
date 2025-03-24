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
    const tenantId = request['tenantId'];

    // Em modo de desenvolvimento, não exigir userId
    const isDevelopment = true; // Você pode alternar isso para false em produção

    if (!tenantId) {
      throw new UnauthorizedException('Tenant não especificado');
    }

    if (!isDevelopment) {
      // Verificações normais para produção
      const userId = request.user?.id;
      if (!userId) {
        throw new UnauthorizedException('Usuário não autenticado');
      }

      // Verifica se o usuário tem acesso ao tenant
      const hasAccess = await this.tenantService.verificarAcessoUsuario(
        userId,
        tenantId,
      );

      if (!hasAccess) {
        throw new UnauthorizedException('Usuário não tem acesso a este tenant');
      }
    } else {
      // Em modo de desenvolvimento, fingir que o usuário está autenticado
      console.log('Development mode: skipping user authentication check');
    }

    return true;
  }
}
