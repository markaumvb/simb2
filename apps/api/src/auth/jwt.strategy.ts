import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FuncionariosService } from '@app/modules/funcionarios/funcionarios.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private funcionarioService: FuncionariosService,
    private configService: ConfigService,
  ) {
    // Log antes de chamar super() para ver se está chegando aqui
    const secretKey = configService.get<string>('SECRETKEY');
    if (!secretKey) {
      const error = 'SECRETKEY não definida no ambiente!';
      console.error(error);
      throw new Error(error);
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey,
      passReqToCallback: false,
    });

    this.logger.log('JwtStrategy inicializada com sucesso');
    console.log('🔥🔥🔥 JwtStrategy constructor completed');
    console.log(
      '🔥🔥🔥 Secret key (first 5 chars):',
      secretKey.substring(0, 5),
    );
    console.log(
      '🔥🔥🔥 ExpireIn:',
      configService.get<string>('EXPIRESIN') || '1h',
    );
  }

  async validate(payload: any) {
    this.logger.log(`Validando JWT payload: ${JSON.stringify(payload)}`);

    const userId = payload.userId;
    if (!userId) {
      throw new UnauthorizedException('Token inválido: userId não encontrado');
    }

    try {
      const user = await this.funcionarioService.findOne(userId);
      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado');
      }

      return {
        id: user.id,
        email: user.email,
        tenantId: payload.tenantId || user.tenant_id,
      };
    } catch (error) {
      this.logger.error(`Error validating user: ${error.message}`);
      throw new UnauthorizedException('Falha na validação do usuário');
    }
  }
}
