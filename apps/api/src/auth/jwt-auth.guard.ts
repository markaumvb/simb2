// src/auth/jwt-auth.guard.ts
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Corrigir tipagem para aceitar Observable também
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      // Chama o canActivate do AuthGuard que usará a estratégia JWT
      const result = super.canActivate(context);

      // Manipular tanto Promise quanto Observable
      if (result instanceof Promise) {
        return result
          .then((value) => {
            this.handleSuccess(context);
            return value;
          })
          .catch((err) => {
            return this.handleError(context, err);
          });
      } else if (result instanceof Observable) {
        // Se for Observable, você pode usar operadores do RxJS se necessário
        // Mas para manter simples, vamos apenas tentar o hack do x-tenant-id
        this.handleSuccess(context);
        return result;
      } else {
        // Resultado booleano direto
        this.handleSuccess(context);
        return result;
      }
    } catch (error) {
      return this.handleError(context, error);
    }
  }

  private handleSuccess(context: ExecutionContext): void {
    // Garantir que o tenantId está disponível para os middlewares
    const request = context.switchToHttp().getRequest();
    if (request.user && request.user.tenantId) {
      request.tenantId = request.user.tenantId;
    }
  }

  private handleError(context: ExecutionContext, error: any): boolean {
    // Apenas para debug durante o desenvolvimento
    console.error('Erro na autenticação JWT:', error.message);

    // Verificar se há cabeçalho x-tenant-id para testes
    const request = context.switchToHttp().getRequest();
    const tenantIdHeader = request.headers['x-tenant-id'];

    if (tenantIdHeader) {
      // Bypass de autenticação durante desenvolvimento
      request.tenantId = Number(tenantIdHeader);
      return true;
    }

    throw new UnauthorizedException('Não autorizado - verifique seu token JWT');
  }
}
