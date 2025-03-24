import { Module, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@app/database/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { FuncionariosModule } from '@app/modules/funcionarios/funcionarios.module';
import { JwtStrategy } from './jwt.strategy';
import { refreshJwtStrategy } from './refreshToken.strategy';

const logger = new Logger('AuthModule');
console.log('❌❌❌ AuthModule being registered');

@Module({
  imports: [
    PrismaModule,
    FuncionariosModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      // Adicione aqui para garantir que o módulo seja inicializado corretamente
      session: false,
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY || 'zjP9h6ZI5LoSKCRjasv',
      signOptions: { expiresIn: process.env.EXPIRESIN || '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'INIT_AUTH',
      useFactory: () => {
        console.log('❌❌❌ AUTH MODULE PROVIDERS INITIALIZED');
        return true;
      },
    },
    AuthService,
    JwtStrategy,
    refreshJwtStrategy,
  ],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {
  constructor() {
    console.log('❌❌❌ AuthModule CONSTRUCTED');
  }
}
