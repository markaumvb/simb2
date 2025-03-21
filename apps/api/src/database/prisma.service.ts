// src/database/prisma.service.ts
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // Use o método correto para adicionar um listener de evento
    this.$on('beforeExit' as any, async () => {
      await app.close();
    });
  }
}
