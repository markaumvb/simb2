import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as passport from 'passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor() {
    super();

    // Debug disponível em tempo de execução
    const strategies = Object.keys((passport as any)._strategies || {});
    this.logger.log(
      `JwtAuthGuard created. Available strategies: ${JSON.stringify(
        strategies,
      )}`,
    );
  }

  canActivate(context: ExecutionContext) {
    this.logger.log('JwtAuthGuard canActivate called');

    // Verifica se a estratégia jwt está registrada
    const strategies = Object.keys((passport as any)._strategies || {});

    if (!strategies.includes('jwt')) {
      this.logger.error(
        'JWT strategy not found! Available: ' + strategies.join(', '),
      );

      if (process.env.NODE_ENV === 'development') {
        // Permitir bypass em desenvolvimento
        const request = context.switchToHttp().getRequest();
        request.user = { tenantId: request.tenantId || 1 };
        return true;
      }
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      this.logger.error(`Auth error: ${err?.message || 'No user found'}`);
      throw new UnauthorizedException('Autenticação requerida');
    }
    return user;
  }
}
