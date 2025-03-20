import { ApiProperty } from '@nestjs/swagger';
import { movimentacao } from '@prisma/client';

export class MovimentacoeEntity implements movimentacao {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true })
  descricao: string;

  @ApiProperty({ required: true })
  status: boolean;

  @ApiProperty({ required: true })
  dt_inicio: Date;

  @ApiProperty()
  dt_encerramento: Date | null;

  @ApiProperty({ required: true })
  id_linha: number;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  dt_possivel_encerramento: Date | null;

  constructor(partial: Partial<MovimentacoeEntity>) {
    Object.assign(this, partial);
  }
}
