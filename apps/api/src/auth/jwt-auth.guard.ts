// apps/api/src/auth/jwt-auth.guard.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      console.error(
        '🔒 Erro de autenticação:',
        err?.message || 'Usuário não encontrado',
      );
      throw err || new UnauthorizedException('Autenticação requerida');
    }
    return user;
  }
}
