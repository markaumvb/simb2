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
    console.log('JwtStrategy initialized with secret key');
  }
  onModuleInit() {
    console.log('JwtStrategy initialized with name: jwt');
  }

  async validate(payload: any) {
    console.log('JwtStrategy.validate called with payload:', payload);

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
      console.error('Error validating user:', error);
      throw new UnauthorizedException('Falha na validação do usuário');
    }
  }
}
