import { ApiProperty } from '@nestjs/swagger';
import { linha } from '@prisma/client';

export class LinhaEntity implements linha {
  @ApiProperty()
  id: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  dt_alteracao: Date;

  @ApiProperty()
  dt_inclusao: Date;
}
