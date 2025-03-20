import { ApiProperty } from '@nestjs/swagger';
import { Tipo_despesa } from '@database';

export class TipoDespesaEntity implements Tipo_despesa {
  @ApiProperty()
  id: number;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  dt_inclusao: Date | null;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  status: boolean | null;

  @ApiProperty()
  tenant_id: number;

  constructor(partial: Partial<TipoDespesaEntity>) {
    Object.assign(this, partial);
  }
}
