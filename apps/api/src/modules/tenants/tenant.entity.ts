import { ApiProperty } from '@nestjs/swagger';

export class TenantEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  cnpj: string;

  @ApiProperty({ required: false })
  razaoSocial: string | null;

  @ApiProperty()
  ativo: boolean;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  dt_inclusao: Date | null;

  constructor(partial: Partial<TenantEntity>) {
    Object.assign(this, partial);
  }
}
