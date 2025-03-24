import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@app/database/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(email: string, password: string, tenantId: number) {
    // Primeiro passo: procurar por usuário através do e-mail informado
    const user = await this.prisma.client.funcionario.findFirst({
      where: {
        email: email,
        tenant_id: tenantId,
      },
    });

    // Se não encontrar o usuário
    if (!user) {
      throw new NotFoundException(
        `Não existem usuários cadastrados com este e-mail: ${email} para este tenant`,
      );
    }

    // Passo 2: Verificar se a senha está correta (user.senha = usuário já atribuído)
    const isPasswordValid = await bcrypt.compare(password, user.senha);

    // Se a senha for incorreta
    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha incorreta');
    }

    // Se o usuário está ativo
    const isFuncionarioAtivo = user.status === true;
    if (!isFuncionarioAtivo) {
      throw new UnauthorizedException('Usuário não está ativo no sistema');
    }

    // Usar ConfigService para obter secrets
    const secretKey = this.configService.get<string>('SECRETKEY');
    const refreshTokenSecret = this.configService.get<string>(
      'REFRESH_TOKEN_SECRET',
    );

    if (!secretKey || !refreshTokenSecret) {
      throw new Error('Chaves de autenticação não configuradas');
    }

    // Gerar token com tenantId
    const payload = {
      userId: user.id,
      email: user.email,
      tenantId: user.tenant_id,
    };

    // Log para depuração
    console.log('Creating JWT with payload:', payload);
    console.log('Using SECRETKEY:', secretKey.substring(0, 5) + '...');

    // Gerar token sem valores hardcoded
    const accessToken = this.jwtService.sign(payload, { secret: secretKey });
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
      // Acessar a variável de ambiente via ConfigService
      const refreshTokenSecret = this.configService.get<string>(
        'REFRESH_TOKEN_SECRET',
      );
      if (!refreshTokenSecret) {
        throw new Error('REFRESH_TOKEN_SECRET não configurado');
      }

      const decoded = jwt.verify(refreshToken, refreshTokenSecret) as {
        userId: number;
        tenantId: number;
      };

      const user = await this.prisma.client.funcionario.findUnique({
        where: {
          id: decoded.userId,
          tenant_id: decoded.tenantId,
        },
      });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      const payload = {
        userId: user.id,
        email: user.email,
        tenantId: user.tenant_id,
      };

      // Acessar a variável de ambiente via ConfigService
      const secretKey = this.configService.get<string>('SECRETKEY');
      if (!secretKey) {
        throw new Error('SECRETKEY não configurado');
      }

      const accessToken = this.jwtService.sign(payload, { secret: secretKey });

      return {
        token: accessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Token de atualização inválido');
    }
  }
}
