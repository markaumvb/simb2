import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FuncionariosService } from '@app/modules/funcionarios/funcionarios.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class refreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  private readonly logger = new Logger(refreshJwtStrategy.name);

  constructor(
    private funcionarioService: FuncionariosService,
    private configService: ConfigService,
  ) {
    const refreshTokenSecret = configService.get<string>(
      'REFRESH_TOKEN_SECRET',
    );
    if (!refreshTokenSecret) {
      const error = 'REFRESH_TOKEN_SECRET não definida no ambiente!';
      console.error(error);
      throw new Error(error);
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: refreshTokenSecret,
    });

    this.logger.log('refreshJwtStrategy inicializada com sucesso');
  }

  async validate(payload: { userId: number }) {
    const user = await this.funcionarioService.findOne(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
