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
    PassportModule.register({ defaultStrategy: 'jwt' }), // Especificar a estratégia padrão
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRETKEY,
        signOptions: { expiresIn: process.env.EXPIRESIN },
      }),
    }),
    FuncionariosModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, refreshJwtStrategy],
  exports: [JwtStrategy, PassportModule], // Exportar a estratégia
})
export class AuthModule {}
