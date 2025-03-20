import { ApiProperty } from '@nestjs/swagger';
import { Sistema } from '@database';

export class SistemaEntity implements Sistema {
  @ApiProperty()
  id: number;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  dt_inclusao: Date;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  tenant_id: number;

  constructor(partial: Partial<SistemaEntity>) {
    Object.assign(this, partial);
  }
}
