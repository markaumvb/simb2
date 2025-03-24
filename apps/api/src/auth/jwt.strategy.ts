// apps/api/src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FuncionariosService } from '@app/modules/funcionarios/funcionarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private funcionarioService: FuncionariosService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRETKEY || 'zjP9h6ZI5LoSKCRjasv',
    });
    console.log('🔑 JwtStrategy inicializada');
  }

  async validate(payload: any) {
    console.log('🔍 Validando JWT payload:', payload);
    const user = await this.funcionarioService.findOne(payload.userId);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return {
      id: user.id,
      email: user.email,
      tenantId: payload.tenantId,
    };
  }
}
