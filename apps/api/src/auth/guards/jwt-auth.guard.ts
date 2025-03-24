// src/auth/guards/jwt-auth.guard.ts
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor() {
    super();
    this.logger.log('JwtAuthGuard inicializado');
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      this.logger.error(
        `Erro de autenticação: ${err?.message || 'Usuário não encontrado'}`,
      );
      throw err || new UnauthorizedException('Não autorizado');
    }

    return user;
  }
}
