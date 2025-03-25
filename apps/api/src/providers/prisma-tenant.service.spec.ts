import { PrismaTenantService } from './prisma-tenant.provider';

// src/providers/prisma-tenant.service.spec.ts
describe('PrismaTenantService', () => {
  let service: PrismaTenantService;
  let prismaServiceMock: any;

  beforeEach(async () => {
    // Configurar mocks...
  });

  describe('addTenantToFilter', () => {
    it('should add tenant_id to filter', () => {
      // Simular tenant_id no request
      service['_request'] = { tenantId: 1 } as any;

      const filter = { id: 123 };
      const result = service.addTenantToFilter(filter);

      expect(result).toEqual({
        id: 123,
        tenant_id: 1,
      });
    });

    it('should throw UnauthorizedException if tenant_id is missing in production', () => {
      // Testar comportamento em produção sem tenant
    });
  });
});
