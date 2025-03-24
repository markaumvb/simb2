// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FuncionariosService } from '@app/modules/funcionarios/funcionarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private funcionarioService: FuncionariosService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRETKEY || 'zjP9h6ZI5LoSKCRjasv',
    });
    console.log('JwtStrategy initialized');
  }

  async validate(payload: any) {
    console.log('JWT validate called with payload:', payload);
    const userId = payload.userId;
    const user = await this.funcionarioService.findOne(userId);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    // Adicionar tenantId ao request
    return {
      id: user.id,
      email: user.email,
      tenantId: payload.tenantId,
    };
  }
}
