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
    // Simplificar a configuração do PassportModule
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // Simplificar configuração do JwtModule
    JwtModule.register({
      secret: process.env.SECRETKEY || 'zjP9h6ZI5LoSKCRjasv', // Adicionar fallback
      signOptions: { expiresIn: '1h' }, // Aumentar para testes
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, refreshJwtStrategy],
  exports: [AuthService, JwtStrategy, JwtModule, PassportModule],
})
export class AuthModule {}
