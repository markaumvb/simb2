import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TenantMiddleware.name);

  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Verificar rotas públicas que não precisam de tenant
    if (this.isPublicPath(req.url)) {
      return next();
    }

    // Extrair tenant do token JWT (padrão primário)
    const authHeader = req.headers['authorization'];
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const token = authHeader.substring(7);
        try {
          // Verificar e extrair o payload do token
          const decoded = this.jwtService.verify(token);
          if (decoded && decoded.tenantId) {
            // Definir o tenantId no request para uso posterior
            req['tenantId'] = Number(decoded.tenantId);
            this.logger.debug(
              `Tenant ID ${decoded.tenantId} extraído do token JWT`,
            );
          }
        } catch (error) {
          this.logger.error(`Token inválido: ${error.message}`);
        }
      } catch (error) {
        this.logger.error(`Erro ao processar token: ${error.message}`);
      }
    }

    // Alternativa: Extrair do cabeçalho específico (fallback)
    if (!req['tenantId']) {
      const headerTenantId = req.headers['x-tenant-id'];
      if (headerTenantId) {
        req['tenantId'] = Number(headerTenantId);
        this.logger.debug(
          `Tenant ID ${headerTenantId} extraído do cabeçalho x-tenant-id`,
        );
      }
    }

    // Se ainda não temos o tenantId e a rota não é pública, o middleware TenantGuard
    // cuidará disso e retornará um erro de UnauthorizedException

    next();
  }

  private isPublicPath(path: string): boolean {
    const publicPaths = [
      '/auth/login',
      '/auth/refresh',
      '/api',
      '/health',
      '/docs',
      '/swagger',
    ];

    return publicPaths.some((publicPath) => path.startsWith(publicPath));
  }
}
