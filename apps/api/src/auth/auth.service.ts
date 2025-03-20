import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private refreshTokenSecret: string;

  constructor(private prisma: PrismaService, private jwtService: JwtService) {
    this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  }

  async login(email: string, password: string, tenantId: number) {
    // Primeiro passo: procurar por usuário através do e-mail informado
    const user = await this.prisma.funcionario.findFirst({
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

    // Gerar token com tenantId
    const payload = {
      userId: user.id,
      email: user.email,
      tenantId: user.tenant_id,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = jwt.sign(payload, this.refreshTokenSecret, {
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
      const decoded = jwt.verify(refreshToken, this.refreshTokenSecret) as {
        userId: number;
        tenantId: number;
      };

      const user = await this.prisma.funcionario.findUnique({
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

      const accessToken = this.jwtService.sign(payload);

      return {
        token: accessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Token de atualização inválido');
    }
  }
}
