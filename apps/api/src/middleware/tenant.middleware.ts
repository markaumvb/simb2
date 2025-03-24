import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';

// src/middleware/tenant.middleware.ts
@Injectable()
export class TenantMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TenantMiddleware.name);
  private readonly secretKey: string;

  // Lista de rotas que não precisam verificar tenant
  private readonly publicPaths = [
    '/auth/login',
    '/auth/refresh',
    '/api',
    // outras rotas públicas que não precisam de tenant
  ];

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.secretKey = this.configService.get<string>('SECRETKEY');
    if (!this.secretKey) {
      throw new Error('SECRETKEY não está configurado no ambiente');
    }
  }

  use(req: Request, res: Response, next: NextFunction) {
    // Melhor verificação de rotas públicas
    if (this.isPublicPath(req.url)) {
      return next();
    }

    // Extrair tenant do cabeçalho
    const headerTenantId = req.headers['x-tenant-id'];
    if (headerTenantId) {
      req['tenantId'] = Number(headerTenantId);
      this.logger.log(`Tenant ID extraído do cabeçalho: ${req['tenantId']}`);
      return next();
    }

    // Extrair tenant do token JWT
    const authHeader = req.headers['authorization'];
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const token = authHeader.substring(7);
        const decoded = this.jwtService.verify(token, {
          secret: this.secretKey,
        });

        if (decoded.tenantId) {
          req['tenantId'] = Number(decoded.tenantId);
          this.logger.debug(`Tenant ID extraído do token: ${req['tenantId']}`);
        } else {
          this.logger.warn('Token sem tenantId');
        }
      } catch (error) {
        this.logger.error(`Erro ao verificar token: ${error.message}`);
        // Não bloqueamos aqui para permitir que o JwtAuthGuard faça isso adequadamente
      }
    }

    next();
  }

  private isPublicPath(path: string): boolean {
    return this.publicPaths.some((publicPath) => path.startsWith(publicPath));
  }
}
