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
import { RefreshJwtAuthGuard } from './refrsh-jwt-auth.guard';

@ApiTags('_Auth')
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
  @UseGuards(RefreshJwtAuthGuard)
  refreshToken(@Body('refresh') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
