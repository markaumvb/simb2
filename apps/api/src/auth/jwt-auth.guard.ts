import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import * as passport from 'passport'; // Importação compatível com ESLint

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor() {
    super();
    this.logger.log('❌❌❌ JwtAuthGuard constructor called');
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log('❌❌❌ JwtAuthGuard canActivate called');
    this.logger.log('❌❌❌ Using strategy: jwt');

    // Listar estratégias registradas
    try {
      // Acesse as estratégias registradas sem usar require()
      const strategies = Object.keys(passport.strategies || {});
      this.logger.log(
        `❌❌❌ Available strategies: ${JSON.stringify(strategies)}`,
      );

      if (!strategies.includes('jwt')) {
        this.logger.error('❌❌❌ JWT strategy is NOT registered in Passport!');
      }
    } catch (error) {
      this.logger.error(`❌❌❌ Error listing strategies: ${error.message}`);
    }

    // Para desenvolvimento, permite uso do header x-tenant-id
    const request = context.switchToHttp().getRequest();
    const tenantIdHeader = request.headers['x-tenant-id'];

    if (tenantIdHeader && process.env.NODE_ENV === 'development') {
      this.logger.log('❌❌❌ Development mode: using x-tenant-id header');
      request.tenantId = Number(tenantIdHeader);

      // Em desenvolvimento, vamos permitir acesso mesmo sem JWT
      this.logger.log(
        '❌❌❌ Development mode: skipping JWT validation temporarily',
      );
      return true;
    }

    this.logger.log('❌❌❌ Calling parent AuthGuard.canActivate');
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    this.logger.log(`❌❌❌ JwtAuthGuard handleRequest called`);

    if (err) {
      this.logger.error(`❌❌❌ Authentication error: ${err.message}`);
      throw err;
    }

    if (!user) {
      const message = info?.message || 'Unknown reason';
      this.logger.error(`❌❌❌ No user found: ${message}`);
      throw new UnauthorizedException('Autenticação requerida');
    }

    this.logger.log('❌❌❌ User authenticated successfully');
    return user;
  }
}
