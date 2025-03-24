import { Module } from '@nestjs/common';
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
    // Registre o PassportModule com a estratégia default explicitamente
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRETKEY || 'zjP9h6ZI5LoSKCRjasv',
      signOptions: { expiresIn: process.env.EXPIRESIN || '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy, // Certifique-se de que o JwtStrategy está listado como provider
    refreshJwtStrategy,
  ],
  exports: [
    AuthService,
    JwtStrategy,
    JwtModule,
    PassportModule, // Exporte o PassportModule para usar em outros módulos
  ],
})
export class AuthModule {
  constructor() {
    console.log('AuthModule initialized');
  }
}
