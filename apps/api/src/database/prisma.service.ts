// src/database/prisma.service.ts
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { prisma } from '@database';

@Injectable()
export class PrismaService implements OnModuleInit {
  constructor() {
    // Não precisa chamar super() pois não estamos estendendo PrismaClient
  }

  get client() {
    return prisma;
  }

  async onModuleInit() {
    await prisma.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await prisma.$disconnect();
      await app.close();
    });
  }
}
