// src/auth/strategies/jwt.strategy.ts
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

// src/auth/strategies/jwt.strategy.ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const secretKey = configService.get<string>('SECRETKEY');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey,
    });
    this.logger.log('JwtStrategy inicializado');
  }

  async validate(payload: any) {
    this.logger.debug(
      `JwtStrategy validando payload: ${JSON.stringify(payload)}`,
    );

    try {
      const user = await this.authService.validateUser(payload.userId);

      if (!user) {
        throw new UnauthorizedException('Não autorizado');
      }

      this.logger.debug(`Usuário ${payload.userId} validado com sucesso`);

      // Retorna os dados que serão acessíveis em req.user
      return {
        id: payload.userId,
        email: payload.email,
        tenantId: payload.tenantId,
      };
    } catch (error) {
      throw new UnauthorizedException('Erro de autenticação');
    }
  }
}
