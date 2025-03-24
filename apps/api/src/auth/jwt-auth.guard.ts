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

    if (tenantIdHeader && process.env.NODE_ENV === 'development') {
      console.log('Development mode: using x-tenant-id header');
      request.tenantId = Number(tenantIdHeader);
      return true; // Permite acesso sem JWT em desenvolvimento
    }

    // Caso contrário, usa autenticação normal JWT
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // Verificar possíveis erros e logs
    if (err) {
      console.error('JWT authentication error:', err);
      throw err;
    }
    if (!user) {
      console.error('JWT user not found:', info?.message);
      throw new UnauthorizedException('Autenticação requerida');
    }

    // Log do user retornado pelo JwtStrategy
    console.log('JWT authenticated user:', user);

    return user;
  }
}
