// src/auth/jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor() {
    console.log('Simplified JwtAuthGuard initialized');
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Simplified JwtAuthGuard canActivate called');
    const request = context.switchToHttp().getRequest();

    // MÉTODO SIMPLIFICADO: Usar x-tenant-id header ou padrão=1
    const tenantIdHeader = request.headers['x-tenant-id'];
    if (tenantIdHeader) {
      console.log('Using x-tenant-id header:', tenantIdHeader);
      request.tenantId = Number(tenantIdHeader);
    } else {
      // Para desenvolvimento, assumir tenant_id = 1
      console.log('Using default tenant ID = 1');
      request.tenantId = 1;
    }

    return true; // Sempre permite acesso durante o desenvolvimento
  }
}
