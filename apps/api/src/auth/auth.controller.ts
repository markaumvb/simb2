// apps/api/src/auth/auth.controller.ts
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { RefreshJwtGuard } from './refresh-jwt.guard';

@ApiTags('Autenticação')
@Controller('autenticacao')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AuthEntity })
  async login(@Body() { email, password, tenantId }: LoginDto) {
    return await this.authService.login(email, password, tenantId);
  }

  @Post('refresh')
  @UseGuards(RefreshJwtGuard)
  async refreshToken(@Body('refresh') refreshToken: string) {
    return await this.authService.refreshToken(refreshToken);
  }
}
