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
    console.log(
      'JwtStrategy initialized with secret:',
      process.env.SECRETKEY || 'zjP9h6ZI5LoSKCRjasv',
    );
  }

  async validate(payload: any) {
    console.log('JWT validate called with payload:', payload);

    // Extrair informações críticas do payload
    const userId = payload.userId;
    const tenantId = payload.tenantId;

    console.log(`Validating user ${userId} for tenant ${tenantId}`);

    try {
      const user = await this.funcionarioService.findOne(userId);

      if (!user) {
        console.error('User not found:', userId);
        throw new UnauthorizedException('Usuário não encontrado');
      }

      // Retorna objeto com informações necessárias
      return {
        id: user.id,
        email: user.email,
        tenantId: tenantId,
      };
    } catch (error) {
      console.error('Error validating JWT user:', error);
      throw new UnauthorizedException('Falha na validação do usuário');
    }
  }
}
