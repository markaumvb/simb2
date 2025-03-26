// src/decorators/public-route.decorator.ts
import { SetMetadata } from '@nestjs/common';

// Define a chave de metadados
export const IS_PUBLIC_KEY = 'isPublic';

// Decorator para marcar rotas como públicas (sem necessidade de tenant ou autenticação)
export const PublicRoute = () => SetMetadata(IS_PUBLIC_KEY, true);
