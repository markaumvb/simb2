// src/auth/jwt-auth.guard.ts
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor() {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log('JwtAuthGuard canActivate called');

    // Em ambiente de desenvolvimento, permitir acesso sem autenticação completa
    if (process.env.NODE_ENV === 'development') {
      try {
        // Tente autenticação normal
        const canActivateResult = super.canActivate(context);

        // Se for uma promessa
        if (canActivateResult instanceof Promise) {
          return canActivateResult.catch((error) => {
            this.logger.warn(
              `Auth falhou em modo desenvolvimento: ${error.message}`,
            );

            // Definir usuário falso para desenvolvimento
            const request = context.switchToHttp().getRequest();
            const tenantId = request.tenantId || 1;
            request.user = { id: 999, email: 'dev@example.com', tenantId };

            return true;
          });
        }

        return canActivateResult;
      } catch (error) {
        this.logger.warn(
          `Auth falhou em modo desenvolvimento: ${error.message}`,
        );

        // Definir usuário falso para desenvolvimento
        const request = context.switchToHttp().getRequest();
        const tenantId = request.tenantId || 1;
        request.user = { id: 999, email: 'dev@example.com', tenantId };

        return true;
      }
    }

    // Em produção, comportamento padrão
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      this.logger.error(`Auth error: ${err?.message || 'No user found'}`);

      if (process.env.NODE_ENV === 'development') {
        // Em dev, retornar usuário falso
        return {
          id: 999,
          email: 'dev@example.com',
          tenantId: 1,
        };
      }

      throw err || new UnauthorizedException('Autenticação requerida');
    }
    return user;
  }
}
