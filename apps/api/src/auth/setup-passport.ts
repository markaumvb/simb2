import * as passport from 'passport';
import { JwtStrategy } from './jwt.strategy';
import { refreshJwtStrategy } from './refreshToken.strategy';
import { Logger } from '@nestjs/common';

const logger = new Logger('PassportSetup');

export function setupPassport(
  jwtStrategy: JwtStrategy,
  refreshStrategy: refreshJwtStrategy,
) {
  logger.log('🔐 Setting up Passport strategies...');

  // Registrar estratégias manualmente
  passport.use('jwt', jwtStrategy);
  passport.use('jwt-refresh', refreshStrategy);

  // Verificar registro
  const strategies = Object.keys((passport as any)._strategies || {});
  logger.log(`🔐 Registered Passport strategies: ${strategies.join(', ')}`);

  return passport;
}
