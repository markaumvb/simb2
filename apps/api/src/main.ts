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
import * as passport from 'passport';
import * as fs from 'fs';
import * as path from 'path';

// Debug para verificar configuração de ambiente
const envFile =
  process.env.NODE_ENV === 'development' ? '.env.development' : '.env';
const envPath = path.join(process.cwd(), envFile);
console.log(`Verificando arquivo de ambiente em: ${envPath}`);
console.log(`Arquivo existe? ${fs.existsSync(envPath) ? 'SIM' : 'NÃO'}`);
if (fs.existsSync(envPath)) {
  console.log(`Conteúdo do arquivo (primeiras linhas):`);
  const content = fs
    .readFileSync(envPath, 'utf8')
    .split('\n')
    .slice(0, 5)
    .join('\n');
  console.log(content);
}

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  logger.log('🔥🔥🔥 Starting application bootstrap');
  logger.log(`🔥🔥🔥 NODE_ENV: ${process.env.NODE_ENV}`);
  logger.log(`🔥🔥🔥 Current working directory: ${process.cwd()}`);
  logger.log(
    `🔥🔥🔥 ENV File: ${
      process.env.NODE_ENV === 'development' ? '.env.development' : '.env'
    }`,
  );

  /*   logger.log(
    `🔥🔥🔥 SECRETKEY: ${process.env.SECRETKEY ? 'Defined' : 'UNDEFINED'}`,
  );
  logger.log(`🔥🔥🔥 EXPIRESIN: ${process.env.EXPIRESIN || 'UNDEFINED'}`);
  logger.log(
    `🔥🔥🔥 REFRESH_TOKEN_SECRET: ${
      process.env.REFRESH_TOKEN_SECRET ? 'Defined' : 'UNDEFINED'
    }`,
  ); */

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

  // Verificar estratégias registradas em passport
  try {
    const passportInstance = passport as any;
    if (passportInstance._strategies) {
      logger.log(
        `🔥🔥🔥 Passport strategies: ${JSON.stringify(
          Object.keys(passportInstance._strategies),
        )}`,
      );
    } else {
      // logger.warn('🔥🔥🔥 No passport strategies found');
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
