// src/providers/prisma-tenant.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { REQUEST } from '@nestjs/core';
import { UnauthorizedException } from '@nestjs/common';
import { PrismaTenantService } from './prisma-tenant.provider';
import { PrismaService } from '../database/prisma.service';

describe('PrismaTenantService', () => {
  let service: PrismaTenantService;
  let prismaServiceMock: any;
  let requestMock: any;

  const TENANT_ID = 123;

  beforeEach(async () => {
    // Mock para o PrismaService
    prismaServiceMock = {
      client: {
        // Métodos mock do cliente Prisma
        $queryRaw: jest.fn(),
        $executeRaw: jest.fn(),
      },
    };

    // Mock para o REQUEST
    requestMock = {
      tenantId: TENANT_ID,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaTenantService,
        { provide: PrismaService, useValue: prismaServiceMock },
        { provide: REQUEST, useValue: requestMock },
      ],
    }).compile();

    service = module.get<PrismaTenantService>(PrismaTenantService);

    // Mock do logger para evitar poluição nos logs durante testes
    jest.spyOn(service['logger'], 'log').mockImplementation(() => {});
    jest.spyOn(service['logger'], 'warn').mockImplementation(() => {});
  });

  describe('currentTenantId', () => {
    it('should return tenant ID from request', () => {
      expect(service.currentTenantId).toBe(TENANT_ID);
    });

    it('should return null when tenant ID is not in request', () => {
      requestMock.tenantId = undefined;
      expect(service.currentTenantId).toBeNull();
    });
  });

  describe('addTenantToFilter', () => {
    it('should add tenant_id to empty filter', () => {
      const result = service.addTenantToFilter();
      expect(result).toEqual({ tenant_id: TENANT_ID });
    });

    it('should add tenant_id to existing filter', () => {
      const filter = { id: 456, status: true };
      const result = service.addTenantToFilter(filter);

      expect(result).toEqual({
        id: 456,
        status: true,
        tenant_id: TENANT_ID,
      });
    });

    it('should throw UnauthorizedException if tenant ID is missing in production', () => {
      // Salvar ambiente original
      const originalNodeEnv = process.env.NODE_ENV;

      try {
        // Simular ambiente de produção
        process.env.NODE_ENV = 'production';

        // Remover o tenantId do request
        requestMock.tenantId = undefined;

        // Deve lançar exceção
        expect(() => service.addTenantToFilter()).toThrow(
          UnauthorizedException,
        );
        expect(() => service.addTenantToFilter()).toThrow(
          'Tenant ID é obrigatório',
        );
      } finally {
        // Restaurar ambiente
        process.env.NODE_ENV = originalNodeEnv;
      }
    });

    it('should return original filter if tenant ID is missing in development', () => {
      // Salvar ambiente original
      const originalNodeEnv = process.env.NODE_ENV;

      try {
        // Simular ambiente de desenvolvimento
        process.env.NODE_ENV = 'development';

        // Remover o tenantId do request
        requestMock.tenantId = undefined;

        // Apenas retornar o filtro original com aviso em dev
        const filter = { id: 789 };
        expect(service.addTenantToFilter(filter)).toEqual(filter);
      } finally {
        // Restaurar ambiente
        process.env.NODE_ENV = originalNodeEnv;
      }
    });
  });

  describe('addTenantToData', () => {
    it('should add tenant_id to data object', () => {
      const data = { name: 'Test', value: 123 };
      const result = service.addTenantToData(data);

      expect(result).toEqual({
        name: 'Test',
        value: 123,
        tenant_id: TENANT_ID,
      });
    });

    it('should override existing tenant_id for security', () => {
      const data = { name: 'Test', tenant_id: 999 }; // Tentativa de falsificar tenant
      const result = service.addTenantToData(data);

      // O método deve substituir o tenant_id para garantir segurança
      expect(result).toEqual({
        name: 'Test',
        tenant_id: TENANT_ID, // Deve usar o tenant do contexto, não o fornecido
      });
    });

    it('should log warning if tenant ID is missing', () => {
      // Mock do logger para capturar avisos
      const warnSpy = jest.spyOn(service['logger'], 'warn');

      // Remover o tenantId do request
      requestMock.tenantId = undefined;

      const data = { name: 'Test' };
      service.addTenantToData(data);

      // Deve logar aviso
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('tenant'));
    });
  });
});
