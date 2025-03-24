// src/auth/strategies/jwt.strategy.ts
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const secretKey = configService.get<string>('SECRETKEY');

    if (!secretKey) {
      throw new Error('SECRETKEY não está configurado');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey,
    });

    this.logger.log('JWT Strategy inicializada com sucesso');
  }

  async validate(payload: any) {
    this.logger.debug(`Validando payload: ${JSON.stringify(payload)}`);

    const user = await this.authService.validateUser(
      payload.userId,
      payload.tenantId,
    );

    if (!user) {
      throw new UnauthorizedException('Não autorizado');
    }

    // Retorna os dados que serão acessíveis em req.user
    return {
      id: payload.userId,
      email: payload.email,
      tenantId: payload.tenantId,
    };
  }
}
