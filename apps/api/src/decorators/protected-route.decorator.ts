import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { TenantGuard } from '@app/guards/tenant.guard';

export function ProtectedRoute() {
  return applyDecorators(UseGuards(JwtAuthGuard, TenantGuard), ApiBearerAuth());
}
