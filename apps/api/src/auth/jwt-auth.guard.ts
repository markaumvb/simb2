// src/auth/jwt-auth.guard.ts
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
    console.log('JwtAuthGuard initialized');
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Adicionar log para debug
    console.log('JwtAuthGuard canActivate called');

    try {
      // Tentar autenticação normal
      const result = super.canActivate(context);

      // Lidar com diferentes tipos de retorno
      if (result instanceof Promise) {
        return result.catch((error) => {
          console.error('JWT Auth error (Promise):', error.message);
          return this.fallbackToTenantHeader(context);
        });
      } else if (result instanceof Observable) {
        // Lidar com Observable
        console.log('Result is Observable - using tenant header if available');
        return this.fallbackToTenantHeader(context);
      } else {
        // Boolean result
        return result;
      }
    } catch (error) {
      console.error('JWT Auth error (direct):', error.message);
      return this.fallbackToTenantHeader(context);
    }
  }

  // Método auxiliar para usar o header x-tenant-id como fallback
  private fallbackToTenantHeader(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const tenantIdHeader = request.headers['x-tenant-id'];

    if (tenantIdHeader) {
      console.log('Using x-tenant-id header:', tenantIdHeader);
      request.tenantId = Number(tenantIdHeader);
      return true;
    }

    throw new UnauthorizedException('Autenticação requerida');
  }
}
