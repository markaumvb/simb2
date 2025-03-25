import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './clientes.service';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

describe('ClientesService', () => {
  let service: ClientesService;
  let prismaTenantMock: any;

  beforeEach(async () => {
    // Mock do PrismaTenantService
    prismaTenantMock = {
      currentTenantId: 1,
      prisma: {
        client: {
          cliente: {
            findMany: jest.fn().mockResolvedValue([]),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      },
      addTenantToFilter: jest.fn((filter) => ({ ...filter, tenant_id: 1 })),
      addTenantToData: jest.fn((data) => ({ ...data, tenant_id: 1 })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientesService,
        {
          provide: PrismaTenantService,
          useValue: prismaTenantMock,
        },
      ],
    }).compile();

    service = module.get<ClientesService>(ClientesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of clientes with pagination', async () => {
      // Setup mock data
      const mockClientes = [{ id: 1, nome: 'Cliente Teste', tenant_id: 1 }];
      const mockTotal = 1;

      prismaTenantMock.prisma.client.cliente.findMany.mockResolvedValue(
        mockClientes,
      );
      prismaTenantMock.prisma.client.cliente.count.mockResolvedValue(mockTotal);

      // Execute
      const result = await service.findAll(1, 10);

      // Assert
      expect(result.data).toEqual(mockClientes);
      expect(result.meta.total).toBe(mockTotal);
      expect(prismaTenantMock.addTenantToFilter).toHaveBeenCalled();
    });
  });
});
