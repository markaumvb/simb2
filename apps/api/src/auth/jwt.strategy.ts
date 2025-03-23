import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FuncionariosService } from '@app/modules/funcionarios/funcionarios.service';

console.log('JwtStrategy loaded');
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private funcionarioService: FuncionariosService) {
    console.log('JwtAuthGuard loaded');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRETKEY,
    });
  }

  async validate(payload: any) {
    // Importante: verifique o formato do payload que seu token JWT emite
    const userId = payload.userId; // Ajuste conforme o formato do seu payload
    const user = await this.funcionarioService.findOne(userId);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    // Adicione o tenantId ao request para uso posterior
    return {
      ...user,
      tenantId: payload.tenantId,
    };
  }
}
