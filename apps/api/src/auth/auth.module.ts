import { Module, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@app/database/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { FuncionariosModule } from '@app/modules/funcionarios/funcionarios.module';
import { JwtStrategy } from './jwt.strategy';
import { refreshJwtStrategy } from './refreshToken.strategy';

@Module({
  imports: [
    PrismaModule,
    FuncionariosModule,
    // IMPORTANTE: Configure o PassportModule corretamente
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY || 'zjP9h6ZI5LoSKCRjasv',
      signOptions: { expiresIn: process.env.EXPIRESIN || '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    // CRÍTICO: Certifique-se de que o JwtStrategy e o refreshJwtStrategy estão incluídos aqui
    AuthService,
    JwtStrategy,
    refreshJwtStrategy,
  ],
  exports: [
    AuthService,
    JwtModule,
    PassportModule,
    // CRÍTICO: Exporte também o JwtStrategy
    JwtStrategy,
  ],
})
export class AuthModule {
  private readonly logger = new Logger(AuthModule.name);

  constructor() {
    this.logger.log('AuthModule initialized');
  }
}
