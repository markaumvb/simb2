import { ApiProperty } from '@nestjs/swagger';
import { Cidade } from '@database';

export class CidadeEntity implements Cidade {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true, nullable: false })
  descricao: string;

  @ApiProperty({ required: true, nullable: false })
  uf: string;

  @ApiProperty()
  dt_alteracao: Date;

  @ApiProperty()
  dt_inclusao: Date;

  @ApiProperty()
  tenant_id: number;

  constructor(partial: Partial<CidadeEntity>) {
    Object.assign(this, partial);
  }
}
