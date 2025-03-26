// src/decorators/protected-route.decorator.ts
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { TenantGuard } from '@app/guards/tenant.guard';

/**
 * Decorator para marcar rotas que requerem autenticação e contexto de tenant
 *
 * Aplica:
 * - JwtAuthGuard: Verifica autenticação JWT
 * - TenantGuard: Verifica contexto de tenant
 * - Documentação Swagger para autenticação
 */
export function ProtectedRoute() {
  return applyDecorators(
    UseGuards(JwtAuthGuard, TenantGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Não autorizado' }),
  );
}
