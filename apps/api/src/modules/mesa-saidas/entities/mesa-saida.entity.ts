import { ApiProperty } from '@nestjs/swagger';
import { Mesa_saida } from '@database';

export class MesaSaidaEntity implements Mesa_saida {
  @ApiProperty()
  id: number;

  @ApiProperty()
  id_mesa: number;

  @ApiProperty()
  id_linha: number;

  @ApiProperty()
  id_movimentacao: number;

  @ApiProperty()
  data_hora: Date | null;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  dt_inclusao: Date | null;

  @ApiProperty()
  coord_x: string | null;

  @ApiProperty()
  coord_y: string | null;

  @ApiProperty()
  id_ponto: number | null;

  @ApiProperty()
  tenant_id: number;

  constructor(partial: Partial<MesaSaidaEntity>) {
    Object.assign(this, partial);
  }
}
