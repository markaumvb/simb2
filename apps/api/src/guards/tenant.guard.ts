import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { TenantService } from '../modules/tenants/tenant.service';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private tenantService: TenantService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tenantId = request['tenantId'];
    const userId = request.user?.id;

    if (!tenantId) {
      throw new UnauthorizedException('Tenant não especificado');
    }

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

    return true;
  }
}
