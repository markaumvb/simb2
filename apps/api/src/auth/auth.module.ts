// src/auth/auth.module.ts
import { Global, Module, OnModuleInit } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@app/database/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { FuncionariosModule } from '@app/modules/funcionarios/funcionarios.module';
import { JwtStrategy } from './jwt.strategy';
import { refreshJwtStrategy } from './refreshToken.strategy';
import * as passport from 'passport';

@Global()
@Module({
  imports: [
    PrismaModule,
    FuncionariosModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      global: true, // Importante para tornar o JWT disponível globalmente
      secret: process.env.SECRETKEY || 'zjP9h6ZI5LoSKCRjasv',
      signOptions: { expiresIn: process.env.EXPIRESIN || '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, refreshJwtStrategy],
  exports: [
    AuthService,
    JwtModule,
    PassportModule,
    JwtStrategy,
    refreshJwtStrategy,
  ],
})
export class AuthModule implements OnModuleInit {
  constructor(
    private readonly jwtStrategy: JwtStrategy,
    private readonly refreshJwtStrategy: refreshJwtStrategy,
  ) {}

  onModuleInit() {
    // Registrar estratégias manualmente
    passport.use('jwt', this.jwtStrategy);
    passport.use('jwt-refresh', this.refreshJwtStrategy);

    // Verificar registro
    console.log(
      'Estratégias registradas:',
      Object.keys(passport['_strategies'] || {}),
    );
  }
}
