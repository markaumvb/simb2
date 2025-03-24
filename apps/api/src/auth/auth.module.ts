// auth.module.ts
import { Global, Module, OnModuleInit, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@app/database/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { FuncionariosModule } from '@app/modules/funcionarios/funcionarios.module';
import { JwtStrategy } from './jwt.strategy';
import { refreshJwtStrategy } from './refreshToken.strategy';
import * as passport from 'passport';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    PrismaModule,
    FuncionariosModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    // Usar registerAsync para garantir que o ConfigService esteja disponível
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secretKey = configService.get<string>('SECRETKEY');
        if (!secretKey) {
          throw new Error(
            'SECRETKEY não está configurada nas variáveis de ambiente!',
          );
        }

        return {
          global: true,
          secret: secretKey,
          signOptions: {
            expiresIn: configService.get<string>('EXPIRESIN') || '1h',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    refreshJwtStrategy,
    {
      provide: 'PASSPORT_SETUP',
      useFactory: (
        jwtStrategy: JwtStrategy,
        refreshStrategy: refreshJwtStrategy,
      ) => {
        const logger = new Logger('PassportSetup');
        logger.log('Configurando estratégias do Passport...');
        // Registrar estratégias manualmente
        passport.use('jwt', jwtStrategy);
        passport.use('jwt-refresh', refreshStrategy);

        // Verificar registro
        const strategies = Object.keys((passport as any)._strategies || {});
        logger.log(
          `Estratégias Passport registradas: ${strategies.join(', ')}`,
        );

        return passport;
      },
      inject: [JwtStrategy, refreshJwtStrategy],
    },
  ],
  exports: [
    AuthService,
    JwtModule,
    PassportModule,
    JwtStrategy,
    refreshJwtStrategy,
  ],
})
export class AuthModule {}
