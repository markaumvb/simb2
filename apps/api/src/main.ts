import 'module-alias/register';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ValidationPipe,
  ClassSerializerInterceptor,
  Logger,
} from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import helmet from 'helmet';
import * as compression from 'compression';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthModule } from './auth/auth.module';
import * as passport from 'passport'; // Importe passport no topo do arquivo

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  logger.log('🔥🔥🔥 Starting application bootstrap');
  logger.log(`🔥🔥🔥 NODE_ENV: ${process.env.NODE_ENV}`);
  logger.log(
    `🔥🔥🔥 ENV File: ${
      process.env.NODE_ENV === 'development' ? '.env.development' : '.env'
    }`,
  );

  // Verificar variáveis de ambiente importantes
  logger.log(
    `🔥🔥🔥 SECRETKEY: ${process.env.SECRETKEY ? 'Defined' : 'UNDEFINED'}`,
  );
  logger.log(`🔥🔥🔥 EXPIRESIN: ${process.env.EXPIRESIN || 'UNDEFINED'}`);

  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableCors();

  // Verificar se JwtStrategy foi registrado
  try {
    const jwtStrategy = app.get(JwtStrategy);
    logger.log(
      `🔥🔥🔥 JwtStrategy instance: ${!!jwtStrategy ? 'FOUND' : 'NOT FOUND'}`,
    );
  } catch (error) {
    logger.error(`🔥🔥🔥 Failed to retrieve JwtStrategy: ${error.message}`);

    // Tentar encontrar o módulo AuthModule
    try {
      const authModule = app.select(AuthModule);
      logger.log(`🔥🔥🔥 AuthModule: ${!!authModule ? 'FOUND' : 'NOT FOUND'}`);
    } catch (err) {
      logger.error(`🔥🔥🔥 Failed to find AuthModule: ${err.message}`);
    }
  }

  // Verificar estratégias registradas em passport - CORRIGIDO
  try {
    // Usar o passport importado no topo do arquivo
    const passportInstance = passport as any;
    if (passportInstance._strategies) {
      logger.log(
        `🔥🔥🔥 Passport strategies: ${JSON.stringify(
          Object.keys(passportInstance._strategies),
        )}`,
      );
    } else {
      logger.warn('🔥🔥🔥 No passport strategies found');
    }
  } catch (error) {
    logger.error(`🔥🔥🔥 Error checking passport strategies: ${error.message}`);
  }

  const config = new DocumentBuilder()
    .setTitle('SIMB API')
    .setDescription('API do SIMB')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  // Corrija a incompatibilidade de tipos com um cast explícito
  const document = SwaggerModule.createDocument(app as any, config);
  SwaggerModule.setup('api', app as any, document, {
    customSiteTitle: 'API DO SIMB',
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'method',
    },
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  logger.log('🔥🔥🔥 Application initialized, starting to listen');
  await app.listen(3000);
}

bootstrap().catch((err) => {
  console.error('🔥🔥🔥 Failed to start application:', err);
});
