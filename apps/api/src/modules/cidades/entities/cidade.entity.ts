import { ApiProperty } from '@nestjs/swagger';
import { cidade } from '@prisma/client';

export class CidadeEntity implements cidade {
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

  constructor(partial: Partial<CidadeEntity>) {
    Object.assign(this, partial);
  }
}
