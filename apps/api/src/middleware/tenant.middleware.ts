import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Tenta extrair o tenant do token JWT
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        if (decoded.tenantId) {
          req['tenantId'] = decoded.tenantId;
        }
      } catch (error) {
        // Apenas log do erro, permite a requisição continuar
        console.error('Erro ao verificar token:', error.message);
      }
    }

    // Tenta extrair o tenant do header personalizado (útil para testes)
    const headerTenantId = req.headers['x-tenant-id'];
    if (headerTenantId && !req['tenantId']) {
      req['tenantId'] = headerTenantId;
    }

    next();
  }
}
