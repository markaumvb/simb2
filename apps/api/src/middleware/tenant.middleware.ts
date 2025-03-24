import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log('TenantMiddleware processing request for path:', req.path);

    // Para rotas que não precisam de tenant (como login)
    const publicPaths = ['/autenticacao/login', '/autenticacao/refresh'];
    if (publicPaths.some((path) => req.path.includes(path))) {
      console.log('Skipping tenant extraction for public path');
      return next();
    }

    // 1. Tenta extrair do header (prioridade para desenvolvimento)
    const headerTenantId = req.headers['x-tenant-id'];
    if (headerTenantId) {
      req['tenantId'] = Number(headerTenantId);
      console.log('Set tenantId from header:', req['tenantId']);
      return next();
    }

    // 2. Tenta extrair do token JWT
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      if (token) {
        try {
          const decoded = this.jwtService.verify(token, {
            secret: process.env.SECRETKEY || 'zjP9h6ZI5LoSKCRjasv',
          });

          console.log('JWT decoded payload:', decoded);

          if (decoded.tenantId) {
            req['tenantId'] = Number(decoded.tenantId);
            console.log('Set tenantId from JWT:', req['tenantId']);
          } else {
            console.warn("JWT doesn't contain tenantId:", decoded);
          }
        } catch (error) {
          console.error('JWT verification failed:', error.message);
        }
      }
    }

    // Se chegou aqui sem um tenantId, log para depuração
    if (!req['tenantId']) {
      console.warn('No tenantId found in request for path:', req.path);
    }

    next();
  }
}
