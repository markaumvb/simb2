import { ApiProperty } from '@nestjs/swagger';
import { sistema } from '@prisma/client';

export class SistemaEntity implements sistema {
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

  constructor(partial: Partial<SistemaEntity>) {
    Object.assign(this, partial);
  }
}
