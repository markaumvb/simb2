// test/tenant-isolation.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';

describe('Tenant Isolation (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let tokenTenant1: string;
  let tokenTenant2: string;

  // IDs dos tenants para teste (devem existir no banco)
  const TENANT1_ID = 1;
  const TENANT2_ID = 2;

  beforeAll(async () => {
    // Criar a aplicação de teste
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);

    // Limpar dados de teste existentes
    await prisma.client.cliente.deleteMany({
      where: {
        OR: [{ tenant_id: TENANT1_ID }, { tenant_id: TENANT2_ID }],
      },
    });

    // Autenticar com usuário do tenant 1
    const responseTenant1 = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'usuario1@exemplo.com', // substitua por um usuário real
        password: 'senha123',
        tenantId: TENANT1_ID,
      });

    tokenTenant1 = responseTenant1.body.token;

    // Autenticar com usuário do tenant 2
    const responseTenant2 = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'usuario2@exemplo.com', // substitua por um usuário real
        password: 'senha123',
        tenantId: TENANT2_ID,
      });

    tokenTenant2 = responseTenant2.body.token;
  });

  afterAll(async () => {
    // Limpar dados de teste
    await prisma.client.cliente.deleteMany({
      where: {
        OR: [{ tenant_id: TENANT1_ID }, { tenant_id: TENANT2_ID }],
      },
    });

    await prisma.client.$disconnect();
    await app.close();
  });

  it('should not allow access to data from another tenant', async () => {
    // 1. Criar cliente no tenant 1
    const createResponse = await request(app.getHttpServer())
      .post('/clientes')
      .set('Authorization', `Bearer ${tokenTenant1}`)
      .set('x-tenant-id', TENANT1_ID.toString())
      .send({
        nome: 'Cliente Tenant 1',
        documento: '12345678901',
        id_cidade: 1,
        id_linha: 1,
        ativo: true,
      });

    expect(createResponse.status).toBe(201);
    const clienteId = createResponse.body.id;

    // 2. Verificar se o tenant 1 pode acessar o cliente criado
    const getResponseTenant1 = await request(app.getHttpServer())
      .get(`/clientes/${clienteId}`)
      .set('Authorization', `Bearer ${tokenTenant1}`)
      .set('x-tenant-id', TENANT1_ID.toString());

    expect(getResponseTenant1.status).toBe(200);
    expect(getResponseTenant1.body.id).toBe(clienteId);

    // 3. Verificar se o tenant 2 NÃO pode acessar o cliente do tenant 1
    const getResponseTenant2 = await request(app.getHttpServer())
      .get(`/clientes/${clienteId}`)
      .set('Authorization', `Bearer ${tokenTenant2}`)
      .set('x-tenant-id', TENANT2_ID.toString());

    // Deve retornar 404 Not Found porque o tenant 2 não deve ver dados do tenant 1
    expect(getResponseTenant2.status).toBe(404);
  });

  it('should only list data from the current tenant', async () => {
    // 1. Criar cliente no tenant 1
    await request(app.getHttpServer())
      .post('/clientes')
      .set('Authorization', `Bearer ${tokenTenant1}`)
      .set('x-tenant-id', TENANT1_ID.toString())
      .send({
        nome: 'Cliente Adicional Tenant 1',
        documento: '11111111111',
        id_cidade: 1,
        id_linha: 1,
        ativo: true,
      });

    // 2. Criar cliente no tenant 2
    await request(app.getHttpServer())
      .post('/clientes')
      .set('Authorization', `Bearer ${tokenTenant2}`)
      .set('x-tenant-id', TENANT2_ID.toString())
      .send({
        nome: 'Cliente Tenant 2',
        documento: '22222222222',
        id_cidade: 1,
        id_linha: 1,
        ativo: true,
      });

    // 3. Listar clientes do tenant 1
    const listResponseTenant1 = await request(app.getHttpServer())
      .get('/clientes')
      .set('Authorization', `Bearer ${tokenTenant1}`)
      .set('x-tenant-id', TENANT1_ID.toString());

    expect(listResponseTenant1.status).toBe(200);

    // Verificar se todos os clientes na lista pertencem ao tenant 1
    const clientesTenant1 =
      listResponseTenant1.body.data || listResponseTenant1.body;
    const containsTenant2Client = clientesTenant1.some(
      (cliente) => cliente.nome === 'Cliente Tenant 2',
    );
    expect(containsTenant2Client).toBe(false);

    // 4. Listar clientes do tenant 2
    const listResponseTenant2 = await request(app.getHttpServer())
      .get('/clientes')
      .set('Authorization', `Bearer ${tokenTenant2}`)
      .set('x-tenant-id', TENANT2_ID.toString());

    expect(listResponseTenant2.status).toBe(200);

    // Verificar se todos os clientes na lista pertencem ao tenant 2
    const clientesTenant2 =
      listResponseTenant2.body.data || listResponseTenant2.body;
    const containsTenant1Client = clientesTenant2.some(
      (cliente) =>
        cliente.nome === 'Cliente Tenant 1' ||
        cliente.nome === 'Cliente Adicional Tenant 1',
    );
    expect(containsTenant1Client).toBe(false);
  });
});
