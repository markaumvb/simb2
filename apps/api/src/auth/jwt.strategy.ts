import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FuncionariosService } from '@app/modules/funcionarios/funcionarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private funcionarioService: FuncionariosService) {
    // Log antes de chamar super() para ver se está chegando aqui
    console.log('🔥🔥🔥 JwtStrategy constructor start');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRETKEY || 'zjP9h6ZI5LoSKCRjasv',
    });

    console.log('🔥🔥🔥 JwtStrategy constructor completed');
    console.log(
      '🔥🔥🔥 Secret key (first 5 chars):',
      (process.env.SECRETKEY || 'zjP9h6ZI5LoSKCRjasv').substring(0, 5),
    );
    console.log('🔥🔥🔥 ExpireIn:', process.env.EXPIRESIN || '1h');
  }

  async validate(payload: any) {
    this.logger.log(`Validating JWT payload: ${JSON.stringify(payload)}`);

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
