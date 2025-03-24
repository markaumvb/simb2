// src/auth/jwt-auth.guard.ts
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('JwtAuthGuard canActivate called');

    // Primeiro tenta o header x-tenant-id para desenvolvimento
    const request = context.switchToHttp().getRequest();
    const tenantIdHeader = request.headers['x-tenant-id'];

    if (tenantIdHeader) {
      console.log('Development mode: using x-tenant-id header');
      request.tenantId = Number(tenantIdHeader);
      return true;
    }

    // Caso contrário, usa autenticação normal
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('Autenticação requerida');
    }
    return user;
  }
}
