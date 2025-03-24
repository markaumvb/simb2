// apps/api/src/auth/auth.module.ts
import { Global, Module, OnModuleInit } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@app/database/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { FuncionariosModule } from '@app/modules/funcionarios/funcionarios.module';
import { JwtStrategy } from './jwt.strategy';
import { RefreshJwtStrategy } from './refresh-jwt.strategy';
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
      secret: process.env.SECRETKEY || 'zjP9h6ZI5LoSKCRjasv', // Fallback apenas para dev
      signOptions: { expiresIn: process.env.EXPIRESIN || '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshJwtStrategy,
    {
      provide: 'PASSPORT_SETUP',
      useFactory: () => {
        // Isso vai garantir que o setup seja executado no início
        console.log('🔐 Configurando estratégias Passport...');
        return true;
      },
    },
  ],
  exports: [
    AuthService,
    JwtModule,
    PassportModule,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
})
export class AuthModule implements OnModuleInit {
  constructor(
    private jwtStrategy: JwtStrategy,
    private refreshJwtStrategy: RefreshJwtStrategy,
  ) {}

  onModuleInit() {
    // Registrar estratégias diretamente aqui
    console.log('⭐ Registrando estratégias JWT no Passport...');
    passport.use('jwt', this.jwtStrategy);
    passport.use('jwt-refresh', this.refreshJwtStrategy);

    // Verificar se foi registrado corretamente
    console.log(
      '⭐ Estratégias disponíveis:',
      Object.keys(passport['_strategies'] || {}),
    );
  }
}
