import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import * as passport from 'passport';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class RefreshJwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor() {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log('JwtAuthGuard canActivate called');

    // Verificando se as estratégias do Passport estão disponíveis
    try {
      const strategies = Object.keys(passport['_strategies'] || {});
      this.logger.log(`Available strategies: ${strategies.join(', ')}`);

      if (!strategies.includes('jwt')) {
        this.logger.warn(
          'JWT strategy not found! Available: ' + strategies.join(', '),
        );
      }
    } catch (e) {
      this.logger.error('Error checking passport strategies:', e);
    }

    // Comportamento padrão
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      this.logger.error(`Auth error: ${err?.message || 'No user found'}`);
      throw err || new UnauthorizedException('Autenticação requerida');
    }
    return user;
  }
}
