import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from '../database/prisma.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private prisma: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // Verifica se o banco de dados está respondendo
      async () => {
        await this.prisma.client.$queryRaw`SELECT 1`;
        return {
          database: {
            status: 'up',
          },
        };
      },
      // Verifica se o serviço está online
      () => this.http.pingCheck('api', 'http://localhost:3000/api'),
    ]);
  }
}
