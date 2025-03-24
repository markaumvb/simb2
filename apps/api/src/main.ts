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

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  logger.log('❌❌❌ Starting application bootstrap');
  logger.log(`❌❌❌ NODE_ENV: ${process.env.NODE_ENV}`);

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
      `❌❌❌ JwtStrategy instance: ${!!jwtStrategy ? 'FOUND' : 'NOT FOUND'}`,
    );
  } catch (error) {
    logger.error(`❌❌❌ Failed to retrieve JwtStrategy: ${error.message}`);
  }

  // Verificar módulos carregados
  const modules = app.get(Reflector).get('modules', AppModule);
  logger.log(
    `❌❌❌ Loaded modules: ${
      modules ? JSON.stringify(Object.keys(modules)) : 'unknown'
    }`,
  );

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

  logger.log('❌❌❌ Application initialized, starting to listen');
  await app.listen(3000);
}
bootstrap().catch((err) => {
  console.error('❌❌❌ Failed to start application:', err);
});
