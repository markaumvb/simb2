import { ApiProperty } from '@nestjs/swagger';
import { membros_linha } from '@prisma/client';

export class MembrosLinhaEntity implements membros_linha {
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

  constructor(partial: Partial<MembrosLinhaEntity>) {
    Object.assign(this, partial);
  }
}
