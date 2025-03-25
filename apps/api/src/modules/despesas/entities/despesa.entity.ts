import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Despesa } from '@database';
import { Especie } from '@prisma/client'; // Importação correta do enum
import { Transform } from 'class-transformer';

export class DespesaEntity implements Despesa {
  @ApiProperty()
  id: number;

  @ApiProperty()
  favorecido: string;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: false })
  valor: Prisma.Decimal;

  @ApiProperty()
  dt_hora: Date;

  @ApiProperty({ enum: Especie })
  status: Especie;

  @ApiProperty()
  dt_cheque: Date | null;

  @ApiProperty()
  num_cheque: string | null;

  @ApiProperty({ required: true })
  id_linha: number;

  @ApiProperty({ required: true })
  id_tipo: number;

  @ApiProperty()
  id_movimentacao: number;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  dt_inclusao: Date | null;

  @ApiProperty()
  id_funcionario: number | null;

  @ApiProperty()
  id_ponto: number | null;

  @ApiProperty()
  tenant_id: number;

  constructor(partial: Partial<DespesaEntity>) {
    Object.assign(this, partial);
  }
}
