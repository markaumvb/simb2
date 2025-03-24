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
      console.log('Authorization header found:', authHeader);
      const token = authHeader.split(' ')[1];
      if (token) {
        console.log('JWT token extracted:', token.substring(0, 10) + '...');
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
          // Tente decodificar sem verificar para debug
          try {
            const parts = token.split('.');
            if (parts.length === 3) {
              const payload = JSON.parse(
                Buffer.from(parts[1], 'base64').toString(),
              );
              console.log('JWT payload decoded without verification:', payload);
            }
          } catch (e) {
            console.error('Failed to parse JWT token:', e.message);
          }
        }
      } else {
        console.warn('Authorization header format incorrect');
      }
    }

    next();
  }
}
