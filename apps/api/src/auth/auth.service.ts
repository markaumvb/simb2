// apps/api/src/auth/auth.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@app/database/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, password: string, tenantId: number) {
    // Buscar usuário
    const user = await this.prisma.client.funcionario.findFirst({
      where: {
        email: email,
        tenant_id: tenantId,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `Usuário não encontrado com email: ${email} no tenant: ${tenantId}`,
      );
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.senha);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha incorreta');
    }

    // Verificar status
    if (!user.status) {
      throw new UnauthorizedException('Usuário inativo');
    }

    // Criar payload
    const payload = {
      userId: user.id,
      email: user.email,
      tenantId: user.tenant_id,
    };

    // Gerar tokens
    const secretKey = process.env.SECRETKEY || 'zjP9h6ZI5LoSKCRjasv';
    const refreshTokenSecret =
      process.env.REFRESH_TOKEN_SECRET || 'zjP9h6ZI5LtregEawdsRj12sv';

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: '7d',
    });

    return {
      token: accessToken,
      usuario: user.nome,
      email: user.email,
      id: user.id,
      tenantId: user.tenant_id,
      refreshToken: refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const refreshTokenSecret =
        process.env.REFRESH_TOKEN_SECRET || 'zjP9h6ZI5LtregEawdsRj12sv';
      const decoded = jwt.verify(refreshToken, refreshTokenSecret) as any;

      // Criar novo token
      const payload = {
        userId: decoded.userId,
        email: decoded.email,
        tenantId: decoded.tenantId,
      };

      const accessToken = this.jwtService.sign(payload);

      return { token: accessToken };
    } catch (error) {
      throw new UnauthorizedException('Token de atualização inválido');
    }
  }
}
