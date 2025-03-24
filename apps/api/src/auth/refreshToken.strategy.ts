import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FuncionariosService } from '@app/modules/funcionarios/funcionarios.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class refreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private funcionarioService: FuncionariosService,
    private configService: ConfigService,
  ) {
    const refreshTokenSecret = configService.get<string>(
      'REFRESH_TOKEN_SECRET',
    );
    if (!refreshTokenSecret) {
      throw new Error('REFRESH_TOKEN_SECRET não definida no ambiente!');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: refreshTokenSecret,
    });
  }

  async validate(payload: { userId: number }) {
    const user = await this.funcionarioService.findOne(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
