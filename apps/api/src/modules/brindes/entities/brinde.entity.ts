import { ApiProperty } from '@nestjs/swagger';
import { Brinde } from '@database';

export class BrindeEntity implements Brinde {
  @ApiProperty()
  id: number;

  @ApiProperty()
  taco: boolean;

  @ApiProperty()
  trofeu: boolean;

  @ApiProperty()
  outros: boolean;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  dt_inclusao: Date | null;

  @ApiProperty()
  id_linha: number;

  @ApiProperty()
  id_movimentacao: number;

  @ApiProperty()
  id_mesa: number;

  @ApiProperty()
  troca_pano: boolean;

  @ApiProperty()
  data: Date;

  @ApiProperty()
  tenant_id: number;

  constructor(partial: Partial<BrindeEntity>) {
    Object.assign(this, partial);
  }
}
