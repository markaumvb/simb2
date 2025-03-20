import { ApiProperty } from '@nestjs/swagger';
import { mesa_entrada } from '@prisma/client';

export class MesaEntradaEntity implements mesa_entrada {
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
  dt_inclusao: Date | null;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  coord_x: string | null;

  @ApiProperty()
  coord_y: string | null;

  @ApiProperty()
  id_ponto: number;

  constructor(partial: Partial<MesaEntradaEntity>) {
    Object.assign(this, partial);
  }
}
