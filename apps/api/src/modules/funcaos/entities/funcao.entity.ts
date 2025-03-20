import { ApiProperty } from '@nestjs/swagger';
import { funcao } from '@prisma/client';

export class FuncaoEntity implements funcao {
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

  constructor(partial: Partial<FuncaoEntity>) {
    Object.assign(this, partial);
  }
}
