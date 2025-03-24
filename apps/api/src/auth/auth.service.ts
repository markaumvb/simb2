// src/auth/auth.service.ts
import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@app/database/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(userId: number, tenantId?: number): Promise<any> {
    this.logger.debug(
      `Validando usuário ID: ${userId}, Tenant ID: ${tenantId}`,
    );

    const whereClause: any = { id: userId };

    // Adicionar tenant_id ao filtro se disponível
    if (tenantId !== undefined) {
      whereClause.tenant_id = tenantId;
    }

    const user = await this.prisma.client.funcionario.findFirst({
      where: whereClause,
    });

    if (!user) {
      this.logger.warn(`Usuário ID ${userId} não encontrado`);
      return null;
    }

    if (!user.status) {
      this.logger.warn(`Usuário ID ${userId} está inativo`);
      return null;
    }

    // Remover a senha da resposta
    const { senha, ...result } = user;
    return result;
  }

  async login(email: string, password: string, tenantId: number) {
    // Buscar usuário pelo email no tenant específico
    const user = await this.prisma.client.funcionario.findFirst({
      where: {
        email,
        tenant_id: tenantId,
      },
    });

    if (!user) {
      this.logger.warn(
        `Login falhou: Usuário com email ${email} não encontrado no tenant ${tenantId}`,
      );
      throw new NotFoundException(
        `Não foi encontrado usuário com o email ${email} neste tenant`,
      );
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.senha);
    if (!isPasswordValid) {
      this.logger.warn(`Login falhou: Senha inválida para usuário ${email}`);
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verificar se o usuário está ativo
    if (!user.status) {
      this.logger.warn(`Login falhou: Usuário ${email} está inativo`);
      throw new UnauthorizedException('Usuário está inativo');
    }

    // Preparar payload para o token
    const payload = {
      sub: user.id,
      userId: user.id,
      email: user.email,
      tenantId: tenantId,
    };

    // Obter chaves secretas do ConfigService
    const accessTokenSecret = this.configService.get<string>('SECRETKEY');
    const refreshTokenSecret = this.configService.get<string>(
      'REFRESH_TOKEN_SECRET',
    );

    if (!accessTokenSecret || !refreshTokenSecret) {
      this.logger.error('Chaves de segurança não configuradas');
      throw new Error('Configuração de segurança incompleta');
    }

    // Gerar tokens
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: '7d',
    });

    this.logger.log(
      `Login bem-sucedido para usuário ${email} no tenant ${tenantId}`,
    );

    // Retornar tokens e informações do usuário
    return {
      token: accessToken,
      refreshToken,
      usuario: user.nome,
      email: user.email,
      id: user.id,
      tenantId,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const refreshTokenSecret = this.configService.get<string>(
        'REFRESH_TOKEN_SECRET',
      );

      if (!refreshTokenSecret) {
        this.logger.error('REFRESH_TOKEN_SECRET não configurado');
        throw new Error('Configuração de segurança incompleta');
      }

      // Verificar e decodificar o token
      const decoded = jwt.verify(refreshToken, refreshTokenSecret) as any;

      // Verificar se o usuário ainda existe e está ativo
      const user = await this.validateUser(decoded.userId);

      if (!user) {
        throw new UnauthorizedException('Usuário inválido ou inativo');
      }

      // Preparar payload para o novo token
      const payload = {
        sub: user.id,
        userId: user.id,
        email: user.email,
        tenantId: decoded.tenantId,
      };

      // Gerar novo token de acesso
      const accessToken = this.jwtService.sign(payload);

      this.logger.log(
        `Token atualizado com sucesso para usuário ${user.email}`,
      );

      return { token: accessToken };
    } catch (error) {
      this.logger.error(`Falha ao atualizar token: ${error.message}`);
      throw new UnauthorizedException('Token de atualização inválido');
    }
  }
}
