// apps/api/src/middleware/tenant.middleware.ts
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  private readonly logger = new Logger('TenantMiddleware');

  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Ignorar rotas de autenticação e docs
    if (
      req.path.includes('/autenticacao') ||
      req.path.includes('/api') // Swagger
    ) {
      return next();
    }

    // Extrair do header X-Tenant-ID
    const headerTenantId = req.headers['x-tenant-id'];
    if (headerTenantId) {
      req['tenantId'] = Number(headerTenantId);
      return next();
    }

    // Extrair do token JWT
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const token = authHeader.substring(7);
        const decoded = this.jwtService.verify(token);

        if (decoded.tenantId) {
          req['tenantId'] = Number(decoded.tenantId);
        }
      } catch (error) {
        this.logger.error(`Erro ao verificar token: ${error.message}`);
      }
    }

    next();
  }
}
