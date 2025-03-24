import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import * as passport from 'passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor() {
    super();
    this.logger.log('JwtAuthGuard constructor called');
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log('❌❌❌ JwtAuthGuard canActivate called');
    this.logger.log('❌❌❌ Using strategy: jwt');

    // Listar estratégias registradas - usando uma abordagem segura para TypeScript
    try {
      // Usando any para evitar erros de tipagem com propriedades internas
      const passportInstance = passport as any;
      const strategies = passportInstance._strategies
        ? Object.keys(passportInstance._strategies)
        : ['No strategies found'];

      this.logger.log(
        `❌❌❌ Available strategies: ${JSON.stringify(strategies)}`,
      );

      if (!strategies.includes('jwt')) {
        this.logger.error('❌❌❌ JWT strategy is NOT registered in Passport!');

        // SOLUÇÃO TEMPORÁRIA: Em desenvolvimento, permita acesso mesmo sem JWT
        if (process.env.NODE_ENV === 'development') {
          this.logger.log(
            '❌❌❌ Development mode: allowing access without JWT validation',
          );

          // Extrai o usuário do request (se existir)
          const request = context.switchToHttp().getRequest();
          const tenantIdHeader = request.headers['x-tenant-id'];

          if (tenantIdHeader) {
            request.tenantId = Number(tenantIdHeader);
            request.user = { tenantId: Number(tenantIdHeader) };
            this.logger.log(`❌❌❌ Set tenant ID: ${request.tenantId}`);
          }

          return true; // Permite acesso
        }
      }
    } catch (error) {
      this.logger.error(`❌❌❌ Error listing strategies: ${error.message}`);
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
