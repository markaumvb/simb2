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

    // Para desenvolvimento, permite uso do header x-tenant-id
    const request = context.switchToHttp().getRequest();
    const tenantIdHeader = request.headers['x-tenant-id'];

    if (tenantIdHeader && process.env.NODE_ENV === 'development') {
      console.log('Development mode: using x-tenant-id header');
      request.tenantId = Number(tenantIdHeader);
      // Em desenvolvimento, ainda valida o JWT se disponível
      if (request.headers.authorization) {
        return super.canActivate(context);
      }
      return true; // Permite acesso sem JWT em desenvolvimento
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      console.error(
        'JWT authentication failed:',
        err?.message || info?.message || 'No user found',
      );
      throw err || new UnauthorizedException('Autenticação requerida');
    }
    return user;
  }
}
