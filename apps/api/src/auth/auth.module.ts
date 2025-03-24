import { Global, Module, OnModuleInit, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@app/database/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { FuncionariosModule } from '@app/modules/funcionarios/funcionarios.module';
import { JwtStrategy } from './jwt.strategy';
import { refreshJwtStrategy } from './refreshToken.strategy';
import { setupPassport } from './setup-passport';

@Global()
@Module({
  imports: [
    PrismaModule,
    FuncionariosModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRETKEY,
      signOptions: { expiresIn: process.env.EXPIRESIN || '1h' },
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
        return setupPassport(jwtStrategy, refreshStrategy);
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
