import { ApiProperty } from '@nestjs/swagger';
import { Historico_composicao } from '@database';

export class HistoricoComposicoeEntity implements Historico_composicao {
  @ApiProperty()
  id: number;
  @ApiProperty()
  id_composicao: number;
  @ApiProperty()
  saldo: number;
  @ApiProperty()
  dt_inclusao: Date | null;
  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  tenant_id: number;

  constructor(partial: Partial<HistoricoComposicoeEntity>) {
    Object.assign(this, partial);
  }
}
