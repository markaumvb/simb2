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
  ) {
    // Verificar no construtor se a chave está disponível
    const secretKey = this.configService.get<string>('SECRETKEY');
    if (!secretKey) {
      this.logger.error(
        'SECRETKEY não definida! Autenticação não funcionará corretamente.',
      );
    } else {
      this.logger.log('SECRETKEY configurada corretamente.');
    }
  }

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

    // Log para debug
    this.logger.debug(`SECRETKEY: ${secretKey ? 'Presente' : 'Ausente'}`);
    this.logger.debug(
      `REFRESH_TOKEN_SECRET: ${refreshTokenSecret ? 'Presente' : 'Ausente'}`,
    );

    if (!secretKey) {
      throw new Error(
        'SECRETKEY não está configurada. Verifique as variáveis de ambiente.',
      );
    }

    if (!refreshTokenSecret) {
      throw new Error(
        'REFRESH_TOKEN_SECRET não está configurada. Verifique as variáveis de ambiente.',
      );
    }

    // Gerar token com tenantId
    const payload = {
      userId: user.id,
      email: user.email,
      tenantId: user.tenant_id,
    };

    // Gerar token especificando a chave secreta
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

  // Resto do código permanece o mesmo...
}
