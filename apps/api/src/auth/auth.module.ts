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

@Global()
@Module({
  imports: [
    PrismaModule,
    FuncionariosModule,
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
    AuthService,
    JwtStrategy,
    refreshJwtStrategy,
    {
      provide: 'AUTH_LOGGER',
      useValue: new Logger('AuthModule'),
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
export class AuthModule implements OnModuleInit {
  private readonly logger = new Logger('AuthModule');

  constructor(
    private readonly jwtStrategy: JwtStrategy,
    private readonly refreshJwtStrategy: refreshJwtStrategy,
  ) {
    this.logger.log('AuthModule constructor called');
    // Log para diagnóstico
    this.logger.log(
      `Secret key: ${process.env.SECRETKEY ? 'Defined' : 'UNDEFINED'}`,
    );
  }

  onModuleInit() {
    this.logger.log('🔐 Registering Passport strategies...');

    // Registrar estratégias diretamente no Passport
    passport.use(this.jwtStrategy);
    passport.use('jwt-refresh', this.refreshJwtStrategy);

    // Verificar registro
    const strategies = Object.keys((passport as any)._strategies || {});
    this.logger.log(`🔐 Registered strategies: ${strategies.join(', ')}`);
  }
}
