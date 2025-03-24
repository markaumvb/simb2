import { ApiProperty } from '@nestjs/swagger';
import { Linha } from '@database';

export class LinhaEntity implements Linha {
  @ApiProperty()
  id: number;

  @ApiProperty()
  status: string;

  @ApiProperty({ required: true })
  descricao: string | null;

  @ApiProperty()
  dt_alteracao: Date;

  @ApiProperty()
  dt_inclusao: Date;

  @ApiProperty()
  tenant_id: number;
}
