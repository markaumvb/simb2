import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
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
      throw new Error('SECRETKEY não definida no ambiente!');
    }
  }

  use(req: Request, res: Response, next: NextFunction) {
    // ... código existente ...

    // Usando a chave secreta obtida do ConfigService
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const decoded = this.jwtService.verify(token, {
          secret: this.secretKey,
        });

        // ... resto do código ...
      } catch (error) {
        // ... código de tratamento de erro ...
      }
    }

    next();
  }
}
