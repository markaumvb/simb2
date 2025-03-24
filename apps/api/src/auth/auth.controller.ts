// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entity/auth.entity';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {
    this.logger.log('AuthController inicializado');
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Fazer login',
    description: 'Autentica um usuário e retorna token JWT',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login realizado com sucesso',
    type: AuthEntity,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Credenciais inválidas',
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthEntity> {
    this.logger.log(
      `Tentativa de login para usuário: ${loginDto.email}, tenant: ${loginDto.tenantId}`,
    );

    try {
      const authResult = await this.authService.login(
        loginDto.email,
        loginDto.password,
        loginDto.tenantId,
      );

      // Log detalhado do token
      this.logger.debug(`Token gerado para ${loginDto.email}:`);
      console.log('Token completo:', authResult.token);

      // Log do token decodificado (sem verificação)
      const tokenParts = authResult.token.split('.');
      if (tokenParts.length === 3) {
        try {
          const payload = JSON.parse(
            Buffer.from(tokenParts[1], 'base64').toString(),
          );
          this.logger.debug('Payload do token:', payload);
        } catch (e) {
          this.logger.error('Erro ao decodificar payload do token:', e.message);
        }
      }

      this.logger.log(`Login bem-sucedido para ${loginDto.email}`);
      return authResult;
    } catch (error) {
      this.logger.error(
        `Falha no login para ${loginDto.email}: ${error.message}`,
      );
      throw error;
    }
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Renovar token',
    description: 'Gera um novo token de acesso usando o refresh token',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: {
          type: 'string',
          description: 'Token de atualização (refresh token)',
        },
      },
      required: ['refreshToken'],
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token atualizado com sucesso',
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          description: 'Novo token de acesso',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Token de atualização inválido',
  })
  async refresh(@Body('refreshToken') refreshToken: string) {
    this.logger.log('Solicitação para renovar token recebida');

    try {
      const result = await this.authService.refreshToken(refreshToken);

      this.logger.debug('Novo token gerado:');
      console.log('Novo token completo:', result.token);

      this.logger.log('Token atualizado com sucesso');
      return result;
    } catch (error) {
      this.logger.error(`Falha ao atualizar token: ${error.message}`);
      throw error;
    }
  }

  @Get('verify-token')
  @ApiOperation({ summary: 'Verificar token para debug' })
  async verifyToken(@Headers('authorization') auth: string) {
    this.logger.debug(`verify-token recebeu: ${auth}`);

    if (!auth) {
      return { valid: false, message: 'Token não fornecido' };
    }

    // Extrair o token, lidando com diferentes formatos
    let token = auth;

    // Remover o prefixo "Bearer " se presente
    if (token.startsWith('Bearer ')) {
      token = token.substring(7);
    }

    // Se ainda tiver "Bearer", talvez tenha sido inserido erroneamente
    if (token.startsWith('Bearer ')) {
      token = token.substring(7);
    }

    this.logger.debug(`Token extraído: ${token.substring(0, 20)}...`);

    try {
      const decoded = this.jwtService.verify(token);
      this.logger.debug(
        `Token verificado com sucesso: ${JSON.stringify(decoded)}`,
      );
      return {
        valid: true,
        decoded,
        message: 'Token válido',
      };
    } catch (error) {
      this.logger.error(`Erro na verificação do token: ${error.message}`);
      return {
        valid: false,
        error: error.message,
        message: 'Token inválido',
      };
    }
  }
}
