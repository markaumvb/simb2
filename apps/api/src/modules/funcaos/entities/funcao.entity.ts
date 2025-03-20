import { ApiProperty } from '@nestjs/swagger';
import { Funcao } from '@database';

export class FuncaoEntity implements Funcao {
  @ApiProperty()
  id: number;

  @ApiProperty()
  descricao: string;

  @ApiProperty({ required: false })
  dt_alteracao: Date | null;

  @ApiProperty({ required: false })
  dt_inclusao: Date | null;

  @ApiProperty()
  id_sistema: number;

  @ApiProperty()
  tenant_id: number;

  constructor(partial: Partial<FuncaoEntity>) {
    Object.assign(this, partial);
  }
}
