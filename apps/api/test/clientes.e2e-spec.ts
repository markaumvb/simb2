// test/clientes.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '@app/database/prisma.service';

describe('ClientesController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;
  const tenantId = 1;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);

    // Limpar dados de teste
    await prisma.client.cliente.deleteMany({
      where: { tenant_id: tenantId },
    });

    // Obter token para testes
    const authResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'teste@exemplo.com',
        password: 'senha123',
        tenantId,
      });

    token = authResponse.body.token;
  });

  afterAll(async () => {
    await prisma.client.$disconnect();
    await app.close();
  });

  it('/clientes (GET)', () => {
    return request(app.getHttpServer())
      .get('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('meta');
      });
  });

  it('/clientes (POST)', () => {
    return request(app.getHttpServer())
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Cliente E2E',
        documento: '12345678900',
        email: 'cliente@teste.com',
        id_cidade: 1,
        id_linha: 1,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.nome).toBe('Cliente E2E');
      });
  });
});
