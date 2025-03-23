import { Injectable, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';

// src/middleware/tenant.middleware.ts
@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {
    console.log('TenantMiddleware initialized');
  }

  use(req: Request, res: Response, next: NextFunction) {
    console.log('TenantMiddleware processing request');

    // Tenta extrair o tenant do token JWT
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        if (decoded.tenantId) {
          console.log('Extracted tenantId from JWT:', decoded.tenantId);
          req['tenantId'] = decoded.tenantId;
        }
      } catch (error) {
        console.error('Token verification error:', error.message);
      }
    }

    // Tenta extrair o tenant do header personalizado
    const headerTenantId = req.headers['x-tenant-id'];
    if (headerTenantId && !req['tenantId']) {
      console.log('Using x-tenant-id header:', headerTenantId);
      req['tenantId'] = Number(headerTenantId);
    }

    // Log do tenant ID final
    console.log('Request tenantId:', req['tenantId']);

    next();
  }
}
