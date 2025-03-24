import { Global, Module, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@app/database/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { FuncionariosModule } from '@app/modules/funcionarios/funcionarios.module';
import { JwtStrategy } from './jwt.strategy';
import { refreshJwtStrategy } from './refreshToken.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    PrismaModule,
    FuncionariosModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secretKey = configService.get<string>('SECRETKEY');
        const logger = new Logger('JwtModule');

        if (!secretKey) {
          logger.error('SECRETKEY não configurada nas variáveis de ambiente!');
          throw new Error('SECRETKEY não configurada');
        }

        logger.log('JwtModule configurado com sucesso');

        return {
          secret: secretKey,
          signOptions: { expiresIn: configService.get('EXPIRESIN') || '1h' },
        };
      },
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
export class AuthModule {}
