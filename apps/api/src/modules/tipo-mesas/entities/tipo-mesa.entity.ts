import { ApiProperty } from '@nestjs/swagger';
import { tipo_mesa } from '../../../packages/database';

export class TipoMesaEntity implements tipo_mesa {
  @ApiProperty()
  id: number;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  dt_inclusao: Date;

  @ApiProperty()
  dt_alteracao: Date;

  @ApiProperty()
  composicao: boolean;

  constructor(partial: Partial<TipoMesaEntity>) {
    Object.assign(this, partial);
  }
}
