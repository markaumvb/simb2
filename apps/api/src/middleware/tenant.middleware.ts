import {
  Injectable,
  NestMiddleware,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TenantMiddleware.name);
  private readonly secretKey: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.secretKey = this.configService.get<string>('SECRETKEY');
    if (!this.secretKey) {
      throw new Error(
        'SECRETKEY não definida no ambiente. A aplicação não funcionará corretamente.',
      );
    }
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `TenantMiddleware processing request for path: ${req.path}`,
    );

    // Ignorar rotas de autenticação
    if (
      req.path.includes('/autenticacao/login') ||
      req.path.includes('/autenticacao/refresh') ||
      req.path.includes('/api') // Ignorar também rotas do Swagger
    ) {
      this.logger.log(
        'Ignorando extração de tenant para rota de auth ou API docs',
      );
      return next();
    }

    // 1. Tentar extrair do header específico
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
          secret: this.secretKey,
        });

        if (decoded.tenantId) {
          req['tenantId'] = Number(decoded.tenantId);
          this.logger.log(`Tenant ID extraído do token: ${req['tenantId']}`);
        } else {
          this.logger.warn('Token não contém tenantId');
          // Sem valor padrão - você deve especificar o tenant
        }
      } catch (error) {
        this.logger.error(`Erro ao verificar token: ${error.message}`);
        // Sem valor padrão para produção ou desenvolvimento
      }
    } else {
      this.logger.warn('Nenhum token de autorização encontrado');
      // Sem valor padrão
    }

    next();
  }
}
