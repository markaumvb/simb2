// apps/api/src/auth/entity/auth.entity.ts
import { ApiProperty } from '@nestjs/swagger';

// Classe para as informações do usuário
export class UserInfo {
  @ApiProperty({ description: 'ID do usuário' })
  id: number;

  @ApiProperty({ description: 'Nome do usuário' })
  name: string;

  @ApiProperty({ description: 'Email do usuário' })
  email: string;

  @ApiProperty({ description: 'ID do tenant do usuário' })
  tenantId: number;
}

export class AuthEntity {
  @ApiProperty({ description: 'Token JWT para autenticação' })
  access_token: string;

  @ApiProperty({ description: 'Token para obter novos tokens de acesso' })
  refresh_token: string;

  @ApiProperty({ description: 'Informações do usuário', type: UserInfo })
  user: UserInfo;
}
