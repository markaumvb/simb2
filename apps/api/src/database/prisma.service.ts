// apps/api/src/database/prisma.service.ts
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // Removendo o evento $on completamente para evitar erro de tipagem
    // Implementar uma abordagem alternativa para shutdown
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
