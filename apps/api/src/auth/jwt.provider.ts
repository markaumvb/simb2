// src/auth/jwt.provider.ts
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export const JWT_SERVICE = 'JWT_SERVICE';

export const jwtServiceProvider: Provider = {
  provide: JWT_SERVICE,
  useFactory: (configService: ConfigService) => {
    const secretKey = configService.get<string>('SECRETKEY');
    return new JwtService({
      secret: secretKey,
      signOptions: { expiresIn: configService.get('EXPIRESIN', '1h') },
    });
  },
  inject: [ConfigService],
};
