// src/middleware/tenant.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log('TenantMiddleware processing request');

    // 1. Extrair tenant do header x-tenant-id (alta prioridade, para desenvolvimento)
    const headerTenantId = req.headers['x-tenant-id'];
    if (headerTenantId) {
      req['tenantId'] = Number(headerTenantId);
      console.log('Set tenantId from header:', req['tenantId']);
      return next();
    }

    // 2. Extrair tenant do token JWT
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        if (decoded.tenantId) {
          req['tenantId'] = decoded.tenantId;
          console.log('Set tenantId from JWT:', req['tenantId']);
        }
      } catch (error) {
        console.log('JWT verification failed:', error.message);
        // Não interrompe o fluxo em caso de erro
      }
    }

    next();
  }
}
