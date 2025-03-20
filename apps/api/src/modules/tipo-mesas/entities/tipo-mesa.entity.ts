import { ApiProperty } from '@nestjs/swagger';
import { Tipo_mesa } from '@database';

export class TipoMesaEntity implements Tipo_mesa {
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

  @ApiProperty()
  tenant_id: number; // Adicionado o campo tenant_id

  constructor(partial: Partial<TipoMesaEntity>) {
    Object.assign(this, partial);
  }
}
