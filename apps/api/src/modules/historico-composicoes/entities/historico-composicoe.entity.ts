import { ApiProperty } from '@nestjs/swagger';
import { historico_composicao } from '@prisma/client';

export class HistoricoComposicoeEntity implements historico_composicao {
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

  constructor(partial: Partial<HistoricoComposicoeEntity>) {
    Object.assign(this, partial);
  }
}
