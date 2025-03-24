// src/auth/strategies/refresh-token.strategy.ts
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  private readonly logger = new Logger(RefreshTokenStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const refreshTokenSecret = configService.get<string>(
      'REFRESH_TOKEN_SECRET',
    );

    if (!refreshTokenSecret) {
      throw new Error('REFRESH_TOKEN_SECRET não está configurado');
    }

    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: refreshTokenSecret,
      passReqToCallback: true,
    });

    this.logger.log('Refresh Token Strategy inicializada com sucesso');
  }

  async validate(req: Request, payload: any) {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token não fornecido');
    }

    const user = await this.authService.validateUser(payload.userId);

    if (!user) {
      throw new UnauthorizedException('Não autorizado');
    }

    return {
      ...user,
      refreshToken,
    };
  }
}
