// src/auth/entity/auth.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty({ description: 'Token JWT para autenticação' })
  token: string;

  @ApiProperty({ description: 'Nome do usuário' })
  usuario: string;

  @ApiProperty({ description: 'Email do usuário' })
  email: string;

  @ApiProperty({ description: 'ID do usuário' })
  id: number;

  @ApiProperty({ description: 'ID do tenant do usuário' })
  tenantId: number;

  @ApiProperty({ description: 'Token para obter novos tokens de acesso' })
  refreshToken: string;
}
