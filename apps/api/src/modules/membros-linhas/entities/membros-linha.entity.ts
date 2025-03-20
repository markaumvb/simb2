import { ApiProperty } from '@nestjs/swagger';
import { Membros_linha } from '@database';

export class MembrosLinhaEntity implements Membros_linha {
  @ApiProperty()
  id: number;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  dt_alteracao: Date;

  @ApiProperty()
  dt_inclusao: Date;

  @ApiProperty()
  id_funcionario: number;

  @ApiProperty()
  id_funcao: number;

  @ApiProperty()
  tenant_id: number;

  constructor(partial: Partial<MembrosLinhaEntity>) {
    Object.assign(this, partial);
  }
}
