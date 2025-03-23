// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FuncionariosService } from '@app/modules/funcionarios/funcionarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private funcionarioService: FuncionariosService) {
    // Corrigir o texto do log e separar do super
    console.log('JwtStrategy loaded');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRETKEY,
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload);
    const userId = payload.userId;
    const user = await this.funcionarioService.findOne(userId);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return {
      ...user,
      tenantId: payload.tenantId,
    };
  }
}
