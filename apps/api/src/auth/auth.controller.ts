import {
  Body,
  Controller,
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
  ) {}

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
    try {
      const authResult = await this.authService.login(
        loginDto.email,
        loginDto.password,
        loginDto.tenantId,
      );

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
    try {
      const result = await this.authService.refreshToken(refreshToken);

      return result;
    } catch (error) {
      throw error;
    }
  }
}
