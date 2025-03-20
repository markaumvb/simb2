import { ApiProperty } from '@nestjs/swagger';
import { tipo_despesa } from '@prisma/client';

export class TipoDespesaEntity implements tipo_despesa {
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

  constructor(partial: Partial<TipoDespesaEntity>) {
    Object.assign(this, partial);
  }
}
