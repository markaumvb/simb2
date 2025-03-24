// src/middleware/tenant.middleware.ts
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TenantMiddleware.name);

  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `TenantMiddleware processing request for path: ${req.path}`,
    );

    // Ignorar rotas de autenticação
    if (
      req.path.includes('/autenticacao/login') ||
      req.path.includes('/autenticacao/refresh')
    ) {
      this.logger.log('Skipping tenant extraction for auth path');
      return next();
    }

    // 1. Tentar extrair do header específico (útil para desenvolvimento)
    const headerTenantId = req.headers['x-tenant-id'];
    if (headerTenantId) {
      req['tenantId'] = Number(headerTenantId);
      this.logger.log(`Tenant ID extraído do header: ${req['tenantId']}`);
      return next();
    }

    // 2. Tentar extrair do token JWT
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const decoded = this.jwtService.verify(token, {
          secret: process.env.SECRETKEY || 'zjP9h6ZI5LoSKCRjasv',
        });

        if (decoded.tenantId) {
          req['tenantId'] = Number(decoded.tenantId);
          this.logger.log(`Tenant ID extraído do token: ${req['tenantId']}`);
        } else {
          this.logger.warn('Token não contém tenantId');
          // Para desenvolvimento, pode definir um valor padrão
          if (process.env.NODE_ENV === 'development') {
            req['tenantId'] = 1; // Tenant padrão para desenvolvimento
            this.logger.log('Usando tenant padrão para desenvolvimento: 1');
          }
        }
      } catch (error) {
        this.logger.error(`Erro ao verificar token: ${error.message}`);
        // Para desenvolvimento, continuar mesmo com erro no token
        if (process.env.NODE_ENV === 'development') {
          req['tenantId'] = 1; // Tenant padrão para desenvolvimento
          this.logger.log(
            'Usando tenant padrão para desenvolvimento devido a erro: 1',
          );
        }
      }
    } else {
      this.logger.warn('Nenhum token de autorização encontrado');
      // Para desenvolvimento, permitir requests sem token
      if (process.env.NODE_ENV === 'development') {
        req['tenantId'] = 1;
        this.logger.log('Usando tenant padrão para desenvolvimento: 1');
      }
    }

    next();
  }
}
