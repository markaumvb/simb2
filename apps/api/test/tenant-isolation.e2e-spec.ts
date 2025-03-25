import { INestApplication } from '@nestjs/common';
import { request } from 'http';

// test/tenant-isolation.e2e-spec.ts
describe('Tenant Isolation', () => {
  let app: INestApplication;
  let tokenTenant1: string;
  let tokenTenant2: string;

  beforeAll(async () => {
    // Configuração e autenticação...
    // Obter tokens para tenant1 e tenant2
  });

  it('should not allow access to data from another tenant', async () => {
    // Criar cliente no tenant 1
    const createResponse = await request(app.getHttpServer())
      .post('/clientes')
      .set('Authorization', `Bearer ${tokenTenant1}`)
      .send({
        nome: 'Cliente Tenant 1',
        documento: '12345678901',
        id_cidade: 1,
        id_linha: 1,
      });

    const clienteId = createResponse.body.id;

    // Tentar acessar com tenant 2 (deve retornar 404)
    const response = await request(app.getHttpServer())
      .get(`/clientes/${clienteId}`)
      .set('Authorization', `Bearer ${tokenTenant2}`);

    expect(response.status).toBe(404);
  });

  it('should only list data from the current tenant', async () => {
    // Criar dados nos dois tenants e verificar isolamento nas listagens
    // ...
  });
});
