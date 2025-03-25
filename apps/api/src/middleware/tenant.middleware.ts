import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';

// src/middleware/tenant.middleware.ts
@Injectable()
export class TenantMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TenantMiddleware.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Verificar rotas públicas
    if (this.isPublicPath(req.url)) {
      return next();
    }

    // Extrair tenant do cabeçalho
    const headerTenantId = req.headers['x-tenant-id'];
    if (headerTenantId) {
      req['tenantId'] = Number(headerTenantId);

      return next();
    }

    // Extrair tenant do token JWT - MUDANÇA CRÍTICA AQUI
    const authHeader = req.headers['authorization'];
    if (authHeader?.startsWith('Bearer ')) {
      try {
        // Use decode em vez de verify - ISSO É CRÍTICO
        const token = authHeader.substring(7);

        const decoded = this.jwtService.decode(token);

        if (decoded && decoded.tenantId) {
          req['tenantId'] = Number(decoded.tenantId);
        }
      } catch (error) {
        this.logger.error(`Erro ao processar token: ${error.message}`);
      }
    }

    next();
  }

  private isPublicPath(path: string): boolean {
    const publicPaths = ['/auth/login', '/auth/refresh', '/api'];
    return publicPaths.some((publicPath) => path.startsWith(publicPath));
  }
}
